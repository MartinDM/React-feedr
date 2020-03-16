import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./Header.scss";
import { FlameIcon } from "../svgs/svgs";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

/* MUI Components */
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: {
    background: 'white', 
    color: 'black',
    padding: '10px',
    border: `2px solid #FC60A8`
  },
});

export default function Header({feeds, handleAdd}){   
  
  const [id, setSelectedId] = useState(0);
  const [weather, setWeather] = useState('Loading');
  
  useEffect((  ) => {
    // Form url based on category key on feed
     
    axios
      .get(
        // https://openweathermap.org/api
        //` apiKey=${process.env.REACT_APP_WEATHER_KEY}`
      )
      .then( ({ data } ) => {     
        console.log(data)  
        //setWeather(data...) 
      });
  }, []);

  return (
    <div className="header">
      <Container>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
        <div className="feed-select">
            <select 
              className='feed-select__list'
              onChange={event => setSelectedId(event.target.value)}
              >
              <option value="Feed">Select a news source</option>
              {  
                feeds.filter( feed => !feed.active )
                .map( (feed, i) => {
                    return <option key={i} value={feed.id}>{feed.name}</option>
                })
              }
            </select>
            <button onClick={ () => handleAdd(id) }><AddIcon /></button>
        </div>
          <Grid item>
            <div className="header__location">
              Location
              <div className="location-weather">

              </div>
            </div>
          </Grid>
          <Grid item>
            <div className="header__logo">
              <FlameIcon />
              Feedr
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
