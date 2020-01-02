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
  const [ userName, setUserName ] = useState(false);
  const [ runGame, setRunGame ] = useState(false);
  
  useEffect(() => {
    const getUserName = window.localStorage.getItem("userData");
    setUserName(getUserName);
  });
  const runNewGame = () => {
    console.log('knapp');
    
    setRunGame(true);
  }
  const startGame = () => {

  }
  return (
    <section className="subPagesContainer gameListContainer">
      <h1>GameList!</h1>
      <section className="gameListContainer">

        <main className="subPagesContents">
          <h4>{ userName }</h4>

          
          <button className="button" onclick={ runNewGame }>Add New Game</button>
          <Button name="Add Game" function={ runNewGame } />
        </main>
      </section>
    </section>
  );
}

export default LobbyPage;
