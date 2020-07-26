import React from 'react';
import Header from './components/Header';
import Board from './components/Board';
import Loading from './components/Loading';
// Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import 'typeface-roboto';
import 'typeface-rambla';
import './Feedr.scss';
 
export default class Feedr extends React.Component {
  
  constructor(props) {
    super(props)
    // Only use this.state here in the constructor as the class is init'd here already; otherwise use setState()
    this.state = {
      isLoading: true,
      name: 'Martin',
      feeds: [
      {
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
        active: false,
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

componentDidMount() {
  this.setState({
    isLoading: false
  })
}

componentWillUnmount() {
  // clearTimeout(timer);
}

updateActiveFeeds(feedId, active) {
    const feeds = this.state.feeds.map( feed => {
      const match = feedId == feed.id;
      feed.justAdded = match;
      if ( match ) feed.active = active;
      return feed
    })
    // Ensure latest feed is first in the list to be iterated
    console.log('Updated', feeds)
    this.setState({feeds})
  }

handleClose(id){
  this.updateActiveFeeds(id, false)
}

handleAdd(id){
  this.updateActiveFeeds(id, true)
}

render() { 
 
  return (
    <>
      <CssBaseline />
      <div className={ `feedr-app ${this.state.isLoading ? "loading" : "" }`}>
      {
        this.isLoading ? <Loading /> 
        : (
          <>
            <Header feeds={this.state.feeds} handleAdd={this.handleAdd} />
            <Board handleClose={this.handleClose} feeds={this.state.feeds} boardName={this.state.name} />
          </>
          )
      }
      </div>
    </>
  )
  }
}
