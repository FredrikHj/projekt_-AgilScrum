import React from 'react';
import './GameCreation.css';
import axios from 'axios';
import Button from '../Button';
import { baseUrl } from '../../Config';

function GameCreation({ playerName }) {
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
          // res
          // redirect here
        }
      })
      .catch(() => {
        // err.response
      });
  }

  return (
    <div className="gamecreation-container">
      <div className="user-container">
        <p className="user-name">
          Logged in as
          {playerName}
        </p>
      </div>
      <form onSubmit={(e) => createGame(e)}>
        <div className="label-name">
          Game name
        </div>
        <input name="game" id="name" className="input-name" />
        <Button type="submit" name="Create game" />
      </form>
    </div>
  );
}

export default GameCreation;
