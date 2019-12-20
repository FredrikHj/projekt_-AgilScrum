import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';import { Button } from '../Button.js';
let gameLisrArr = [];

function lobbyPage(props) {
  console.log(props);
  
  return (
    <div>
      <h1>GameList!</h1>
      <h4>{ props.userName}</h4>
      
      <Button 
          name="Add Game"
          function={ props.runNewGame }
      />  
    </div>
  );
}

export default lobbyPage;
