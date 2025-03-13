import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import Filter from './components/Filter'
import countriesService from './services/countries'

function App() {
  const [newChar, setNewChar] = useState('')
  const [countryData, setCountryData] = useState([])
  
  useEffect(() => {
    countriesService
      .fetchCountries()
      .then(initialCountries => {
        console.log(initialCountries)
        setCountryData(initialCountries)
      })
  }, [])

  const changeChar = (event) => {
    setNewChar(event.target.value)
    console.log(newChar)
  }

  return (
    <div>
      <h2>Country info</h2>
      <Search
        newChar={newChar} 
        changeChar={changeChar} 
      />
      <Filter
        countries={countryData}
        newChar={newChar}
      />
    </div>
  )
}

export default App
