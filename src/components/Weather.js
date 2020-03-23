import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { CloudIcon } from "../svgs/svgs";
import RefreshIcon from '@material-ui/icons/Refresh';
import { usePosition } from '../helpers/helpers'

const Weather = (props) => {
const { latitude, longitude, error } = usePosition();

const StyledWeather = styled.div`
  border: 1px solid red;
`

return (
      <StyledWeather>
        { latitude }
        { longitude }
        <CloudIcon />
        <RefreshIcon onClick={ props.handleRefresh } />
        <p>
        { latitude }
        </p>
      </StyledWeather>
  )
}
export default Weather;