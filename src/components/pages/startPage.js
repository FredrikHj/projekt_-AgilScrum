import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { updateLocalstorage } from '../localStorage.js';
import Button from '../Button.js';
import LobbyPage from './lobbyPage.js';


function StartPage(props) {
  const [ userName, setUserName ] = useState(null);
  const [ link, setLink ] = useState(true);

  const runUserName = (e) => {
    const targetStr = e.target.value;
    console.log(targetStr);
    
    const userNamesStorage = {
      player1: targetStr,
      player2: 'player2'
    }
    updateLocalstorage(userNamesStorage);
    setUserName(targetStr);
}
  return (
    <section className="subPagesContainer">

      <div className="userNameContainer">
        <label id="userName">Username --></label>
        <input type="text" id="userName" className="input" onChange={ runUserName } value={ userName } />
      </div>
      <Button 
        patchLink={ link }
        patchTo="/lobby"
        className=""
        name="GoTo Lobby"
        function={ '' }
      /> 
    </section>
  );
}

export default StartPage;