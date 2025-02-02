import axios from 'axios'
baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const fetchCountries = () => {
  const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
}

export default { fetchCountries }