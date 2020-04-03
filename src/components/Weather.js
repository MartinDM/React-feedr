import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { CloudIcon } from "../svgs/svgs";
import RefreshIcon from '@material-ui/icons/Refresh';
//import { getPosition } from '../helpers/helpers'
import { usePosition } from 'use-position';
   
const Weather = (props) => {
  
  const StyledWeather = styled.div`
  border: 1px solid red;
  `
  const [ weather, setWeather ] = useState({});
  /* const [ position, setPosition ] = useState({
    latitude: null,
    longitude: null,
  }); */
  
  // const location =  useState( () => getPosition() ); 
  const { latitude, longitude, timestamp, error } = usePosition();
  
  const getWeather = async keyword => {
    
    const response = await searchForecast(keyword);
    setWeather(response.data);
  };

  useEffect(() => {

    
    getWeather()
    const weatherApi = () => {
      const sourceUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_KEY}`;
      axios(sourceUrl)
      .then(response => {
        console.log(response.data);
        setWeather(response.data);
      });
    };

    (async function fetchWeather() {
      await weatherApi();
    })();
   
  }, []);

  return (
    <StyledWeather>
      {weather.weather &&
        <p>  {weather.weather[0].main}  </p>
      }
      <p>Weather in {weather.name}</p>
      <CloudIcon />
      <RefreshIcon onClick={props.handleRefresh} />
    </StyledWeather>
  )
}
export default Weather;