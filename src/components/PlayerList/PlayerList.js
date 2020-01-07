import React from 'react';
import './PlayerList.css';
import { faChessKing } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTurnColor } from '../../utils';

function PlayerList({ players, turn }) {
  /* function getTurnColor(playerColor) {
    return turn === playerColor ? '#ffb048' : 'lightgray';
  } */

  return (
    <div className="player-list__container">
      <ul className="player-list__list">
        { players
          ? players.map((player) => (
            <li key={player.id} className="player-list__list-item">
              <FontAwesomeIcon icon={faChessKing} size="lg" style={{ color: getTurnColor(player.color, turn) }} />
              <span className="list-item__player-name">{player.playerName}</span>
            </li>
          ))
          : null }
      </ul>
    </div>
  );
}

export default PlayerList;
