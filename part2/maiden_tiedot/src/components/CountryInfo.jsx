const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
      {Object.entries(country.languages).map(([abbr, lang]) =>
        <li key={abbr}>
          {lang}
        </li>
      )}
      </ul>
      <img src={country.flags['png']}></img>
    </div>
  )
}

export default CountryInfo