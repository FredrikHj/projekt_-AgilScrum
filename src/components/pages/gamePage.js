import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChessBoard from '../ChessBoard/ChessBoard';
import Modal from '../Modal/Modal';


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
