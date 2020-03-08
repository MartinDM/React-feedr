import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Card = (props) => {
  // bring in state using hooks
  const [posts, setPosts] = useState([]);
  const Card = styled.div`
    border: 3px solid grey;
    position: relative;
    margin: 1em 0;
    padding: 6px;
    h2 {
      text-transform: uppercase;
      letter-spacing: -1px;
    }
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      li {
        margin-bottom: 4px;
        a:first-child {
          text-decoration: none;
          font-weight: bold;
          color: #333;
          background-image: linear-gradient(120deg, #FC60A8 0%, #ff86be 100%);
          background-repeat: no-repeat;
          background-size: 100% 0.2em;
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
    top: 10px;
    right: 10px;
    &:hover {
      opacity: .5
    }
  `
  // https://css-tricks.com/understanding-react-setstate/
  
  
  useEffect(() => {
    axios
      .get(
        `http://newsapi.org/v2/top-headlines?sources=${props.source}&apiKey=${process.env.REACT_APP_NEWS_KEY}`
      )
      .then( ({data } ) => {
        console.log(data.articles);
        setPosts(data.articles);
      });
  }, []);



  return (
      <div>
      <Card>
      <StyledHighlightOffIcon onClick={ props.handleClose }  />
        <h2>
        { props.title }
        </h2>
        <ul>  
        { 
          posts.map( (post, i) => (
            <li onClick={ () => props.handleClick(post.url)} key={i} title={post.name}>
              <a href={ post.url }>
              {post.title}
              </a>
            </li> 
          ))
        }
        </ul> 
        </Card>
      </div>
  )
}
export default Card;