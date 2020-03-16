import React from 'react';
import Header from './components/Header';
import Board from './components/Board';

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';

import 'typeface-roboto';
import './Feedr.scss';
 
export default class Feedr extends React.Component {
  
  constructor(props) {
    super(props)
    // Only use this.state here in the constructor as the class is init'd here already; otherwise use setState()
    this.state = {
      name: 'Martin',
      feeds: [{
        id: 1,
        name: 'HackerNews', 
        source: 'hacker-news', 
        active: false,
        original: 'https://news.ycombinator.com'
      },
      {
        id: 2,
        name: 'BBC News',
        source: 'bbc-news',
        active: true,
        original: 'https://bbc.co.uk/news'
      },
      {
        id: 3,
        name: 'Science',
        category: 'health',
        active: false
      },
      {
        id: 4,
        name: 'Technology',
        category: 'technology',
        active: false
      }
    ]
  }
  this.handleClose = this.handleClose.bind(this);
  this.handleAdd = this.handleAdd.bind(this);
}


setFeedActiveStates(feedId, activeState) {
  this.setState( (prevState, s) => {
    const feeds = prevState.feeds.map( feed => {
      if ( feed.id == feedId ) feed.active = activeState;
      return feed
    })
    return { feeds }
  })
}

handleClose(id){
  this.setFeedActiveStates(id, false)
}

handleAdd(id){ 
  this.setFeedActiveStates(id, true)
}

render() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="feedr-app">
      <Header feeds={this.state.feeds} handleAdd={this.handleAdd}  />
      <Board handleClose={this.handleClose} feeds={this.state.feeds} boardName={this.state.name} />
    </div>
    </React.Fragment> 
    )
  };
}