import CountryInfo from "./CountryInfo"

const Filter = ({ newChar, countries }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().startsWith(newChar.toLowerCase()))
  if (filteredCountries.length > 10) {
    return <div><p>Too many matches, specify another filter</p></div>
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map(country =>
          <p key={country.cca2}>
            {country.name.common}
          </p>
          )}
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return <CountryInfo country={filteredCountries[0]}/>
  } else {
    return <p>No countries found</p>
  }
}

export default Filter