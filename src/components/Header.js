import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./Header.scss";
import { FlameIcon } from "../svgs/svgs";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

export default function Header({feeds}){
  const handleChange = feed => event => {
    console.log('selected', feed);
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
        <FormControl>
        <InputLabel htmlFor="feed-select">Feed</InputLabel>
        <Select
          native
          onChange={handleChange('age')}
          inputProps={{
            name: 'age',
            id: 'feed-select',
          }}
        >
          <option value="" />
          { 
            feeds.map( (feed, i) => 
            <option key={i} value={feed.url}>{feed.name}</option>
            )
          }
        </Select>
      </FormControl>
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
