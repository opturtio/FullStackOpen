import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import Filter from './components/Filter'
import Weather from './components/Weather'
import fetchCountries from './services/countries'
import fetchWeather from './services/weather'

function App() {
  const [newChar, setNewChar] = useState('')
  const [countryData, setCountryData] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weatherData, setWeatherData] = useState([])
  
  useEffect(() => {
    fetchCountries()
      .then(initialCountries => setCountryData(initialCountries))
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      fetchWeather(selectedCountry.capital)
      .then(initialWeather => setWeatherData(initialWeather))
    }
  }, [selectedCountry])

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
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />
      <Weather weatherData={weatherData} />

      <br></br>
      <p>Powered by:</p>
      <a href="https://www.weatherapi.com/" title="Free Weather API" target="_blank">
        <img src="https://cdn.weatherapi.com/v4/images/weatherapi_logo.png" alt="Weather data by WeatherAPI.com" border="0"/>
      </a>
    </div>
  )
}

export default App
