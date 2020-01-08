import React from 'react';
import './GameList.css';

function GameList({ games }) {
  return (
    <div className="gamelist-container">
      {
        games.map((game) => (
          <div key={game.id} className="gamelist-game">
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
  );
}

export default GameList;
