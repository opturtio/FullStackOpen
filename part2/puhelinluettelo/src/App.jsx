import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newChar, setNewChar] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])

  const initializePersons = () => {
    personsService
      .initPersons()
      .then(initialPersons => {
        console.log(initialPersons)
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }

  useEffect(initializePersons, [])

  const changeChar = (event) => {
    setNewChar(event.target.value)
    setPersonsToShow(
      persons.filter((person) =>
        person.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }

  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const existingPerson = persons.find((person) => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .update(existingPerson.id, { ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(persons.map(person => 
                person.id !== existingPerson.id ? person : updatedPerson
            ))
            setPersonsToShow(personsToShow.map(person => 
                person.id !== existingPerson.id ? person : updatedPerson
            ))
          })
        }
    } else {
      personsService
        .add(newPerson)
        .then(returnedPersons => {
          const updatedPersons = persons.concat(returnedPersons)
          setPersons(updatedPersons)
          setPersonsToShow(updatedPersons)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    personsService
      .deletePerson(id)
      .then(() => {
        const updatedPersons = persons.filter(person => person.id !== id)
        setPersons(updatedPersons)
        setPersonsToShow(updatedPersons)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        newChar={newChar} 
        changeChar={changeChar} 
      />

      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        changeName={changeName}
        newNumber={newNumber}
        changeNumber={changeNumber}
      />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App