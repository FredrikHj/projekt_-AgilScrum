import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gamePage.css';
import Chess from 'chess.js';
import ChessBoard from '../ChessBoard/ChessBoard';
import PlayerList from '../PlayerList/PlayerList';
import Modal from '../Modal/Modal';

const chessJs = new Chess();


function GamePage(props) {
  const [data, setData] = useState({});
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isWinner] = useState(true);
  // const [username, setUsername] = useState('');

  function gameResultContent() {
    if (isWinner) {
      return (
        <>
          <p className="modal-text">Congratulations you won!</p>
          <button type="button">End Game</button>
        </>

      );
    }
    return (
      <>
        <p>Better luck next time!</p>
        <button type="button">End Game</button>
      </>
    );
  }

  function closeWinnerModal() {
    setShowWinnerModal(false);
  }

  function getColor() {
    /* for (const key in data.players) {
      if (data.players[key].name === username) {
        return data.players[key].color;
      }
    } */
    return 'white';
  }

  function getPlayerTurn() {
    return chessJs.turn(data.fen) === 'w' ? 'white' : 'black';
  }

  function postMove(fen) {
    const paramId = props.match.params.id;
    axios.post(`http://localhost:3030/api/game/${paramId}`, { fen })
      .then(() => {
      });
  }

  useEffect(() => {
    const paramId = props.match.params.id;
    axios.get(`http://emil.nilsson.link/api/game/${paramId}`)
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <div className="game-container">
      <PlayerList players={data.players} turn={getPlayerTurn()} />
      <Modal title={isWinner ? 'Winner' : 'Loser'} content={gameResultContent()} show={showWinnerModal} close={closeWinnerModal} />

      <div className="board-container">
        { Object.keys(data).length
          ? <ChessBoard color={getColor()} fenKey={data.fen} postMove={postMove} />
          : null}
      </div>
    </div>
  );
}

export default GamePage;
