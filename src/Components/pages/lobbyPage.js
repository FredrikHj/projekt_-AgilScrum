import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Button from '../Button.js';
import GameMordal from '../ModalPopUp.js';

function LobbyPage(props) {

  const [ addGameName, setAddGameName ] = useState(null);
  let getUserName = window.localStorage.getItem("userData")

  return (
    <section className="subPagesContainer">
      <h1>GameList!</h1>
      <GameMordal
        
      />
      <main className="subPagesContents">
        <h4>{ `${ getUserName } & Playser 2` }</h4>
        
        <Button 
            name="Add Game"
            function={ props.runNewGame }
            />  
      </main>
    </section>
  );
}

export default LobbyPage;
