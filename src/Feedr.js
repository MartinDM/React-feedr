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
        url: 'https://jsonplaceholder.typicode.com/posts/10',
      },
      {
        id: 2,
        name: 'BBC News',
        source: 'bbc-news',
        active: true,
        url: 'https://jsonplaceholder.typicode.com/users/10',
      }
    ]
  }
  this.handleClose = this.handleClose.bind(this);
}

componentWillMount() {
  const activeFeeds = this.state.feeds.filter( feed => feed.active); 
  this.setState({ 
    activeFeeds: activeFeeds
  })
}

componentDidUpdate() {
  console.log('state now',this.state);
}

getAvailableFeeds(){
  this.state.feeds.filter( (feed) => !feed.active );
}


handleClose(id){
  console.log('closing', id)
  const feeds = this.state.feeds.map( feed => {
    if ( feed.id === id ) {
      feed.active = feed.id === id ? false : feed.active
    }
    return feed
  });
  this.setState( (prevState, props) => {
    console.log(prevState, props)
    const activeFeeds = prevState.feeds.filter( feed => feed.active);
    return {
      feeds,
      activeFeeds
    }
  }) 
}


  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className="feedr-app">
        <Header feeds={this.state.feeds} />
        <Board handleClose={this.handleClose} feeds={this.state.activeFeeds} boardName={this.state.name} />
      </div>
      </React.Fragment> 
    )
  };
}