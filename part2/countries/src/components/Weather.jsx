import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY
    const [lat, lon] = country.capitalInfo.latlng   // coordinates of the capital

    useEffect(() => {
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
            .then(response => setWeather(response.data))
    }, [])   // runs once when this country's view appears

    if (!weather) {
        return null   // nothing to show until the weather arrives
    }

    return (
        <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>temperature {weather.main.temp} °C</p>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather