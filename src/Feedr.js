import React from 'react';
import Header from './components/Header';
import Board from './components/Board';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';
import './Feedr.css';

function Feedr() {
  const state = {
    name: 'Martin'
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="feedr-app">
      <Header />
      <Board boardName={state.name} />
    </div>
    </React.Fragment> 
  );
}

export default Feedr;
