const Weather = ({ weatherData }) => {
    if (!weatherData || !weatherData.location) {
        return <p>Loading weather data...</p>
    }
    return (
        <div>
            <h2>Weather in {weatherData.location.name}</h2>
            <p>Temperature {weatherData.current.temp_c} Celsius</p>
            <img src={weatherData.current.condition['icon']}></img>
            <p>Wind {(weatherData.current.wind_kph/3.6).toFixed(1)} m/s</p>
        </div>
    )
}

export default Weather