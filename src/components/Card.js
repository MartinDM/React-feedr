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

  // Styled components
  const Card = styled.div`
  box-shadow: inset 0px -2px 7px 0px rgba(55,55,55,0.4);
  border: 3px solid lightgrey;
  position: relative;
  border-radius: 6px;
  padding: 8px;
  overflow: scroll;
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
    &.fadeOut { 
      transition: opacity 2s ease-out;
      opacity: 0;
    }
    &.fadeIn {
      transition: opacity 2s ease-out;
      opacity: 1;
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
      <StyledLinearProgress color="secondary" className={ !isLoading ? 'fadeOut' : 'fadeIn' } />
      <StyledHighlightOffIcon onClick={ props.handleClose }  />
        <h2>
        { feed.name }
        </h2> 
        <ul className={ !isLoading ? 'fadeIn' : 'fadeOut'}>  
        { 
          posts.map( (post, i) => (
            <li onClick={ () => props.handleClick(post.url)} key={i} title={post.name}>
              <a href={ post.url }>
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