import React, { useState, useEffect } from 'react';

import "./Header.scss";
import { FlameIcon } from "../svgs/svgs";

/* MUI Components */
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Weather from './Weather';
import Logo from './Logo';

const useStyles = makeStyles({
  root: {
    background: 'white', 
    color: 'black',
    padding: '10px',
    border: `2px solid #FC60A8`
  },
});

export default function Header({feeds, handleAdd}){   
  
  const [id, setSelectedId] = useState();
  const [isClean, setClean] = useState(true);
  const [activeFeed, setActiveFeed ] = useState()

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => { 
    setClean(id ? false : true);
  });

  const selectOptions = feeds.map( feed => ({
        ...feed,
        value: feed.id,
        label: feed.name
  })).filter( feed => !feed.active );
                         

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
              value={ isClean ? '' : id }
              onChange={ event => {
                  setSelectedId(event.target.value);
                }
              }>
              <option>Select a news source</option>
              {
                feeds.filter( feed => !feed.active )
                .map( (feed, i) => {
                    return <option key={i} value={feed.id}>{feed.name}</option>
                })
              }
            </select>
            <button onClick={ () => {
              setSelectedId()
              handleAdd(id);
            }
          }>
            <AddIcon /></button>
        </div>
          <Grid item className="weather-container">
            <Weather /> 
          </Grid>
          <Grid item className="header__logo">
             <Logo />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
