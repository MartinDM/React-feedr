import React from 'react';

import "./Header.scss";
import { FlameIcon } from "../svgs/svgs";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

/* MUI Components */
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import CONFIG from '../config';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles({
  root: {
    background: 'white', 
    color: 'black',
    padding: '8px 10px',
    border: `2px solid ${CONFIG.css.colors.pink}`
  },
});

export default function Header({feeds}){ 
  console.log(feeds)
  const handleChange = event => {
    console.log(event.target.value);
  };

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
              >
              <option value="Feed">Select a feed</option>
              { 
                 feeds.map( (feed, i) => {
                  return <option key={i} value={feed.url}>{feed.name}</option>
                })
              }
            </select>
            <button>+</button>
        </div>
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
