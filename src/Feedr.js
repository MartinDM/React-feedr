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
        name: 'Reddit: r/ReactJS',
        icon: '🚀',
        source: 'reddit', 
        active: true,
        original: 'https://www.reddit.com/r/reactjs.json?count=50'
      },
      {
        id: 2,
        name: 'Top News stories',
        source: 'bing-news',
        active: false,
        category: 'uk',
        original: 'https://www.bing.com/news'
      },
      {
        id: 3,
        name: 'Technology',
        category: 'ScienceAndTechnology',
        active: false
      },
      {
        id: 4,
        name: 'Sport',
        category: 'sports',
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
