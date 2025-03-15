import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const fetchCountries = () => {
  const request = axios.get(baseUrl)
    return request.then(response => {
      return response.data
    })
}

export default fetchCountries