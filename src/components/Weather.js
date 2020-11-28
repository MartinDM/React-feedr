import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import styled from 'styled-components';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ReloadIcon from '@material-ui/icons/Cached';
import "./Weather.scss";
const CORS_PROXY='https://cors-anywhere.herokuapp.com/';

const Weather = (props) => {
  
  const StyledWeather = styled.div`
  color: #FC60A8;
  padding: 10px;
  position: relative;
  border-radius: 6px;
  background: rgb(0,0,0); 
  background: linear-gradient(45deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.05) 100%);
  p { color: white; margin: 0; text-transform: uppercase; }
  img { padding: 0 14px; padding-right: 14px; height: 65px; }
  `

  /*  Hooks and vars */
  const [ weather, setWeather ] = useState({})
  let [ position, setPosition ] = useState({})
  const [ isLoaded, setLoaded ] = useState(false)
  const [ apiFailed, setApiFailed ] = useState(false);
  let weatherMessage = 'Fetching weather...';
  let reloadButton;

  useEffect( () => {
      fetchWeather();
  }, [])

  const getPosition = async () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const fetchWeather = async () => {
    position = await getPosition();
    setPosition(position);
    setApiFailed(false);
    const isDevelopment = process.env.NODE_ENV === 'development';
    const { latitude, longitude } = position.coords;
    // Use a proxy for CORS when running locally
    const weatherUrl = `${isDevelopment ? CORS_PROXY : '' }https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`;
    try {
       await axios({
        url: weatherUrl,
        timeout: 5000
      })
      .then( res => {
        const weather = res.data;
        weather.formattedTime = moment.unix(weather.dt).startOf('minute').fromNow();
        weather.icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        setWeather(weather);
        setLoaded(true);
      })
    } catch (err) {
      setApiFailed(true);
      return;
    }
    setLoaded(true);
  };

  const handleReload = () => {
    setApiFailed(false);
    fetchWeather();
  }

  /* Create reload button and message if Weather API response failed */
  if (apiFailed) {
    reloadButton = <ReloadIcon onClick={ () =>  handleReload() } />
    weatherMessage = 'Weather is unavailable right now';
  } 

  return (
    <div className="weather">
    { !isLoaded ? 
      <StyledWeather className="weather--failed">
         <p>{ weatherMessage }</p> 
         { reloadButton }
      </StyledWeather>
        : 
      <StyledWeather>
        <p><LocationOnIcon fontSize="small" /> {weather.name}</p> 
        <div className="weather__temperatures">
            <span><strong>{weather.main.temp}&deg; </strong></span>
            <ul className="weather__high-low">
              <li>
              <span className="weather__label">High: </span>
            {weather.main.temp_max}&deg; </li>
              <li>
              <span className="weather__label">Low: </span>
              {weather.main.temp_min}&deg;
            </li>
            </ul>
            <img src={weather.icon} alt=""/>
        </div>
        <p>{weather.formattedTime}</p>
      </StyledWeather>
    }
    </div>
  )
}
export default Weather;