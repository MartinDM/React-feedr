import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import RefreshIcon from '@material-ui/icons/Refresh';
import "./Weather.scss";
const Weather = (props) => {
  
  const StyledWeather = styled.div`
  color: #FC60A8;
  min-height: 75px;
  padding: 10px;
  position: relative;
  border-radius: 6px;
  background: rgb(0,0,0); 
  background: linear-gradient(45deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.05) 100%);
  p { color: white; margin: 0; text-transform: uppercase; }
  img { padding: 0 14px; padding-right: 14px; height: 65px; }
  `

  const [ weather, setWeather ] = useState({})
  let [ position, setPosition ] = useState({})
  const [ isLoaded, setLoaded ] = useState(false)

  useEffect( () => {
      fetchWeather();
      console.log(weather);
    // only runs when component mounts
  }, [])

  const getPosition = async () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  const fetchWeather = async () => {
    position = await getPosition();
    setPosition(position);
    const { latitude, longitude } = position.coords;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=metric`;
    await axios(weatherUrl)
          .then( res => res.data )
          .then( res => { 
            const weather = res;
            console.log(weather);
            setWeather(weather);
            setLoaded(true);
          }) 
  };

  const handleRefresh = () => {
    console.log('refresh');
  }

  const weatherIcon = isLoaded ? weather.weather[0].icon : null;

  return (
      <div className="weather">
      { !isLoaded &&
       <StyledWeather>
          <p>Fetching weather...</p>
        </StyledWeather>
      }
      { isLoaded &&
       <StyledWeather>
          <p> Weather in {weather.name} </p>
          <div className="weather__temperatures">
              <span><strong>{weather.main.temp}&deg; </strong></span>
              <div className="weather__high-low">
                <span>{weather.main.temp_max}&deg; </span>
                <span>{weather.main.temp_min}&deg; </span>
              </div>
              <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt=""/>
          </div>
       </StyledWeather>
      }
      </div>
  )
}
export default Weather;