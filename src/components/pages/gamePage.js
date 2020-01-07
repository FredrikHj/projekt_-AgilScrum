import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChessBoard from '../ChessBoard/ChessBoard';
import { baseUrl } from '../../Config';


function GamePage({ match }) {
  const paramId = match.params.id;
  const [data, setData] = useState({});
  const [username, setUsername] = useState('');

  function getColor() {
    const currentPlayer = data.players.find((player) => player.playerName === username);
    return currentPlayer.color;
  }

  function pollData() {
    setTimeout(() => {
      axios.get(`${baseUrl}api/game/${paramId}`)
        .then((res) => {
          setData(res.data);
          pollData();
        });
    }, 2000);
  }

  function postMove(fen, from, to) {
    const payload = {
      fen,
      move: { name: username, from, to },
    };
    axios.post(`${baseUrl}api/game/${paramId}/move`, payload)
      .then(() => {
      });
  }

  useEffect(() => {
    // Mock username
    setUsername(Math.floor(Math.random() * 2) ? 'jonas' : 'Rasmus');

    axios.get(`${baseUrl}api/game/${paramId}`)
      .then((res) => {
        setData(res.data);
        pollData();
      });
  }, []);

  return (
    <div className="board-container">
      { Object.keys(data).length
        ? <ChessBoard color={getColor()} fenKey={data.fen} postMove={postMove} />
        : null}
    </div>
  );
}

export default GamePage;
