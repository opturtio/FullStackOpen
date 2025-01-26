import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newChar, setNewChar] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const changeChar = (event) => {
    setNewChar(event.target.value)
  }

  const changeName = (event) => {
    setNewName(event.target.value)
  }
  
  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const filterPersons = (event) => {
    event.preventDefault()
    setPersons(persons.filter((person) => person.name.toLowerCase().includes(newChar.toLowerCase())))
    setNewChar('')
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    setNewName('');
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={filterPersons}>
        <div>
          filter shown with
          <input
            value={newChar}
            onChange={changeChar}
          />
        </div>
      </form>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input
            value={newName}
            onChange={changeName}
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber}
            onChange={changeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, idx) => (<li key={idx}>{person.name} {person.number}</li>))}
      </ul>
    </div>
  )

}

export default App