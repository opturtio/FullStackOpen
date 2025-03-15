import CountryInfo from "./CountryInfo"
import { useState } from "react"

const Filter = ({ newChar, countries, selectedCountry, setSelectedCountry }) => {
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().startsWith(newChar.toLowerCase())
  )

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country => (
          <div key={country.cca2}>
            <p>{country.name.common}</p>
            <button onClick={() => setSelectedCountry(country)}>Show</button>
          </div>
          ))}
        {selectedCountry && <CountryInfo country={selectedCountry} />}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    setSelectedCountry(filteredCountries[0])
    return <CountryInfo country={filteredCountries[0]}/>
  } else {
    return <p>No countries found</p>
  }
}

export default Filter