import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notifications from './components/Notifications'
import personsService from './services/persons-service'
// import Person from '../../backend/models/person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('green')
  const [newChar, setNewChar] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personsToShow, setPersonsToShow] = useState([])

  const initializePersons = () => {
    personsService
      .initPersons()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
      .catch(error => console.log(error.response.data))
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

  const showMessage = (message, timeout = 3000, color = 'green') => {
    setMessage(message)
    setColor(color)

    setTimeout(() => {
      setMessage(null)
    }, timeout)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    console.log('newPerson:', newPerson)
    const existingPerson = persons.find((person) => person.name === newName)
    console.log('existingPerson:', existingPerson)

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
            console.log("HEY NYT:",newPerson.number)
            showMessage(`New number ${newPerson.number} added to ${existingPerson.name}`, 3000, 'green')
          })
          .catch(error => {
            showMessage('Failed to update the person. They may have been removed from the server', 4000, 'red')
          })
      }
    } else {
      personsService
        .add(newPerson)
        .then(returnedPersons => {
          const updatedPersons = persons.concat(returnedPersons)
          setPersons(updatedPersons)
          setPersonsToShow(updatedPersons)
          showMessage(`New person ${newPerson.name} added`, 3000, 'green')
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.error) {
            showMessage(error.response.data.error, 4000, 'red')  // ✅ shows Mongoose error
          } else {
            showMessage('Failed to add the person', 4000, 'red')
          }
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
        showMessage('Person deleted!', 3000, 'green')
      })
      .catch(error => {
        showMessage('Information has already been removed from the server!', 4000, 'red')
        setPersons(persons.filter(person => person.id !== id))
        setPersonsToShow(personsToShow.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications
        message={message}
        color={color}
      />

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
