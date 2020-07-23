import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import LinearProgress from '@material-ui/core/LinearProgress';
 
const Card = (props) => { 
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const feed = props.feed;
  const isCategory = feed.hasOwnProperty('category');

  // Styled component
  const Card = styled.div`
  box-shadow: -2px 7px #afafaf, inset 0px -8px 4px rgba(255,255,255, .7);
  border: 3px solid lightgrey;
  background: white;
  position: relative;
  padding: 8px;
  overflow-x: scroll;
  .fadeIn {
    opacity: 1;
  }
  h2 {
    text-transform: uppercase;
    letter-spacing: -1px;
    margin-top: 4px;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
      transition: opacity .5s ease-in-out;
      opacity: 0;
      li {
        margin-bottom: 4px;
        a:first-child {
          text-decoration: none;
          font-weight: bold;
          color: #333;
          background-image: linear-gradient(120deg, #FC60A8 0%, #ff86be 100%);
          background-repeat: no-repeat;
          background-size: 100% 2px;
          background-position: 0 75%;
          transition: background-size 0.25s ease-in-out;
          padding: 4px;
          &:hover {
            background-size: 100%;
            
          }
        }
      }
      img {
        display: block;
        max-width: 100px
      } 
    }
  `
  const StyledHighlightOffIcon = styled(HighlightOffIcon)`
  opacity: .9;
  transition: all 0.2s 0s ease-in;
  cursor: pointer;
  position: absolute;
    top: 16px;
    right: 12px;
    &:hover {
      opacity: .5
    }
  `
  const StyledLinearProgress = styled(LinearProgress)`  
    transition: opacity 1s ease-out;
    &.fadeOut { 
      opacity: 0;
    }
  ` 
  
  useEffect((  ) => {
    // Form url based on category key on feed
    const sourceUrl = isCategory ?
                      `country=gb&category=${feed.category}` :
                      `sources=${feed.source}`
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?${sourceUrl}&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      )
      .then( ({ data } ) => {
        console.log(data.articles);
        setTimeout( () => {
          setPosts(data.articles);
          setIsLoading(false)
        }, 800)
      });
  }, []);
 
   

  return (
      <Card className={ `fadeIn card__${feed.name.toLowerCase().replace(' ', '-') }`}>
      <StyledLinearProgress color="secondary" className={ !isLoading ? 'fadeOut' : '' } />
      <StyledHighlightOffIcon onClick={ props.handleClose }  />
        <h2>
        { feed.name }
        </h2> 
        <ul className={ !isLoading ? 'fadeIn' : 'fadeOut'}>  
        { 
          posts.map( (post, i) => (
            <li key={i} title={post.name}>
              <a href={ post.url } target="_blank">
              { post.title }
              </a>
            </li> 
          ))
        }
        </ul> 
        </Card>
  )
}
export default Card;