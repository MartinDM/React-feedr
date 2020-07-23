import React from 'react';
import "./Logo.scss";
import { FlameIcon } from "../svgs/svgs";

export default function Logo (){   
  return ( 
    <div className="logo">
      <FlameIcon />
      <p>Feedr</p>
    </div>
  );
}
