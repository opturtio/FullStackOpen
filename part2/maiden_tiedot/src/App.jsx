import { useState } from 'react'
import './App.css'
import Filter from './components/Filter'

function App() {
  const [newChar, setNewChar] = useState('')

  const changeChar = (event) => {
    
    setNewChar(event.target.value)
    console.log(newChar)
  }

  return (
    <div>
      <h2>Country info</h2>
      <Filter 
        newChar={newChar} 
        changeChar={changeChar} 
      />

    </div>
  )
}

export default App
