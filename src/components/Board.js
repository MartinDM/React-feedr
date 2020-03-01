import React from 'react';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from './Card'; 

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    fetchFeed(id){
        console.log(id)
        console.log( this.state.feeds.find( feed => feed.id ));
    }

    render() {
        return (
            <Container>
            <Grid
            container
            direction="row"
            justify="space-between"
            > 
            <div className="board"> 
            { 
                this.props.feeds.map( feed => <Card handleClose={ () => this.props.handleClose(feed.id) } key={feed.id} posts={feed.posts} source={feed.source} title={feed.name} /> )
            }
            </div>
            </Grid>
            </Container>
        )
    }
}

// ******** RULE
// If you ever have a class component with only a render method – you should always make it a functional component.

/* 
// First we create our class
class Greeting extends React.Component {

  // Then we add our constructor which receives our props
  constructor(props) {
      super(props);
      // Next we establish our state
      this.state = {
          name: '',
          greeting: `Good ${this.props.time}, `
      }
      // To use the 'this' keyword, we need to bind it to our function
      this.onChange = this.onChange.bind(this);
  }

  // A custom function to change the name in our state to match the user input
  onChange(e) {
      this.setState({
          name: e.target.value
      })
  }
  // The render function, where we actually tell the browser what it should show
  render() {
      return (
          <div>
              <section className="section">
                  <label className="label">Name:</label>
                  <input className="input" name="name" placeholder="Enter your name..." onChange={this.onChange} />
              </section>
              <section className="section">
                  <p>{this.state.greeting} {this.state.name}</p>
              </section>
          </div>
      )
  }
}
 */