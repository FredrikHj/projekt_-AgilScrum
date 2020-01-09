import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './GameCreation.css';
import Button from '../Button/Button';
import { baseUrl } from '../../Config';

function GameCreation({ playerName }) {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState('');

  function createGame(e) {
    e.preventDefault();
    e.stopPropagation();

    const gameName = e.target.children[1].value;

    axios.post(`${baseUrl}api/lobby`, {
      playerName,
      gameName,
    })
      .then((res) => {
        if (res.status === 201) {
          setRedirect(res.data.id);
        }
      })
      .catch(() => {
        setError('Something went wrong, try again!');
      });
  }

  return (
    <div className="gamecreation-container">
      {
        redirect && (<Redirect to={`/game/${redirect}`} />)
      }
      <div className="header-container">
        <p className="header-label">Create a game</p>
      </div>
      <div className="form-container">
        <form onSubmit={(e) => createGame(e)}>
          <div className="label-name">
            Game name
          </div>
          <input name="game" id="name" className="input-name" />
          <Button type="submit" name="Create game" />
          {
            error && (<div className="label-error">{error}</div>)
          }
        </form>
      </div>
    </div>
  );
}

export default GameCreation;
