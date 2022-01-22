import React, { useState, useEffect } from 'react';

import "./Header.scss";
/* MUI Components */
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AddIcon from '@material-ui/icons/Add';
import Weather from './Weather';
import Logo from './Logo';

export default function Header({feeds, handleAdd}){   
  
  const [id, setSelectedId] = useState();
  const [isClean, setClean] = useState(true);

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
          <Grid item>
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
