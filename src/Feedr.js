import React from 'react';
import Header from './components/Header';
import Board from './components/Board';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';
import './Feedr.css';

function Feedr() {
  const state = {
    name: 'Martin',
    feeds: [{
      name: 'HackerNews',
      url: 'https://jsonplaceholder.typicode.com/posts/10'
    },
    {
      name: 'BBC News',
      url: 'https://jsonplaceholder.typicode.com/users/10'
    }
  ]}
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="feedr-app">
      <Header feeds={state.feeds} />
      <Board boardName={state.name} />
    </div>
    </React.Fragment> 
  );
}

export default Feedr;
