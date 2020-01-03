import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChessBoard from '../ChessBoard/ChessBoard';

function GamePage(props) {
  const [data, setData] = useState({});
  // const [username, setUsername] = useState('');

  function getColor() {
    /* for (const key in data.players) {
      if (data.players[key].name === username) {
        return data.players[key].color;
      }
    } */
    return 'white';
  }

  function postMove(fen) {
    const paramId = props.match.params.id;
    axios.post(`http://localhost:3030/api/game/${paramId}`, { fen })
      .then(() => {
      });
  }

  useEffect(() => {
    /* const paramId = props.match.params.id;
    axios.get(`http://localhost:3030/api/game/${paramId}`)
      .then((res) => {
        setData(res.data);
      }); */
    setData({
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
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
