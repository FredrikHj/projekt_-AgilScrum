import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './GameList.css';
import axios from 'axios';
import { baseUrl } from '../../Config';
import Modal from '../Modal/Modal';

function GameList({ games, playerName }) {
  const [redirect, setRedirect] = useState('');
  const [error, setError] = useState('');

  function joinGame(id) {
    axios.post(`${baseUrl}api/game/${id}/join`, {
      playerName,
      id,
    })
      .then((res) => {
        if (res.status === 200) {
          setRedirect(res.data.gameId);
        }
      })
      .catch(() => {
        setError('Game is full!');
      });
  }


  return (
    <div className="gamelist-container">
      {
        error && (<Modal show title="Could not join game!" content="Game is full :(" close={() => setError('')} />)
      }
      {
        redirect && (<Redirect to={`/game/${redirect}`} />)
      }
      <div className="gamelist-header-container">
        <p className="gamelist-header">Games</p>
      </div>
      <div className="gamelist-games">
        {
          games.map((game) => (
            <div
              key={game.id}
              className="gamelist-game"
              onClick={() => {
                joinGame(game.id);
              }}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  joinGame(game.id);
                }
              }}
              role="button"
              tabIndex="0"
            >
              <div className="gamelist-box">
                <h4>Game Name</h4>
                <h3 className="gamelist-name">{game.gameName}</h3>
              </div>
              <div className="gamelist-box">
                <h4>Players</h4>
                <h3>
                  {game.players.length}
                  /2
                  {' '}
                </h3>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default GameList;
