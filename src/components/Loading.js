import React from 'react';
import Logo from './Logo';
import { ThreeDots } from 'svg-loaders-react';
import "./Loading.scss";

export default function Loading (){   
  return ( 
      <div className="loading-content">
        <Logo />
        <ThreeDots />
      </div>
  );
}
