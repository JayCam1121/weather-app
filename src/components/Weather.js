import axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react';

const Weather = () => {

    const [ weather, setWeather ] = useState({});
    const [ celsius, setCelsius ] = useState(true);
    

    useEffect(() => {
        function success(pos) {
            var crd = pos.coords;
    
            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&units=metric&appid=460a49b30687dc897e54a33c562717d2`)
                .then(res => setWeather(res.data))
                .catch((error) => console.log(error.response));
        };
    
        function error(err) {
            console.log("El usuario no permite la ubicacion");
        };
        
        navigator.geolocation.getCurrentPosition(success, error);
    }, [])
    
    const switchGrades = () => setCelsius(!celsius);

    

    return (
    <div className='app'>
    {(typeof weather.main != "undefined") ? (
        <div className='card'>
            <div className='city'>{weather.name} , {weather.sys.country}</div>
            <div className='description'>"{weather.weather[0].description}"</div>
            <div className='temp'>{celsius ? `${Math.round(weather.main.temp)} °C` : `${((weather.main.temp * 9/5) + 32).toFixed(0)} °F` } </div>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <div className='weather'>{weather.weather[0].main}</div>
            <button className='button' onClick={switchGrades}>°C / °F</button>
        </div>
        ) : ('')}
    </div>
    );
};

export default Weather;