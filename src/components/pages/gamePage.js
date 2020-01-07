import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChessBoard from '../ChessBoard/ChessBoard';
import { baseUrl } from '../../Config';
import Modal from '../Modal/Modal';


function GamePage({ match }) {
  const paramId = match.params.id;
  const [data, setData] = useState({});
  const [username, setUsername] = useState('');
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isWinner] = useState(true);


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
    <>
      <Modal title={isWinner ? 'Winner' : 'Loser'} content={gameResultContent()} show={showWinnerModal} close={closeWinnerModal} />
      <div className="board-container">
        { Object.keys(data).length
          ? <ChessBoard color={getColor()} fenKey={data.fen} postMove={postMove} />
          : null}
      </div>
    </>

  );
}

export default GamePage;
