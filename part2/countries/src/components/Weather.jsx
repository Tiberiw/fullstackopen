import { useEffect, useState } from "react";
import weatherService from '../services/weather'

const Weather = ({capital}) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!capital) return;
        
        weatherService
            .getByCapital(capital)
            .then(res => setWeather(res))
            .catch(() => setError('Failed to load weather data'));
    }, [capital])

    if (error) return <p>{error}</p>

    if (!weather) return null;

    const {icon, main} = weather.weather[0]
    const imgSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <p>Temperature {weather.main.temp} Celsius </p>
            <img src={imgSrc} alt={`Image of ${main}`} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
};

export default Weather;