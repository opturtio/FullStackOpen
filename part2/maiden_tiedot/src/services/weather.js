import axios from 'axios'

const baseUrl = 'https://api.weatherapi.com/v1'

const fetchWeather = async (city) => {
  if (!city) {
    console.error("City name is missing!")
    return null
  }

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  if (!apiKey) {
    console.error("API key is missing!")
    return null
  }

  try {
    const requestUrl = `${baseUrl}/current.json?key=${apiKey}&q=${city}`
    console.log(`Requesting Weather API: ${requestUrl}`)

    const response = await axios.get(requestUrl)
    console.log("Weather API Response:", response.data)
    return response.data
  } catch (error) {
    if (error.response) {
      console.error("Error response:", error.response)
    }
    return null
  }
}

export default fetchWeather