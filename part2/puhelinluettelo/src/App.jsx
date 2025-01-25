import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const changeName = (event) => {
    setNewName(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('');
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: 
          <input
            value={newName}
            onChange={changeName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <div>debug: {newName}</div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person, idx) => (<li key={idx}>{person.name}</li>))}
      </ul>
    </div>
  )

}

export default App