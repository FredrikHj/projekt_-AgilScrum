import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './gamePage.css';
import Chess from 'chess.js';
import ChessBoard from '../ChessBoard/ChessBoard';
import PlayerList from '../PlayerList/PlayerList';
import HistoryList from '../HistoryList/HistoryList';
import { baseUrl } from '../../Config';
import Modal from '../Modal/Modal';
import { getColor } from '../../utils';

const chessJs = new Chess();

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

  function pollData() {
    setTimeout(() => {
      axios.get(`${baseUrl}api/game/${paramId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            setData(res.data);
            pollData();
          }
        })
        .catch(() => {
          pollData();
        });
    }, 2000);
  }

  function getPlayerTurn() {
    if (data.fen) {
      chessJs.load(data.fen);
    }
    return chessJs.turn(data.fen) === 'w' ? 'white' : 'black';
  }

  function postMove(fen, from, to) {
    const payload = {
      fen,
      move: { name: username, from, to },
    };
    axios.post(`${baseUrl}api/game/${paramId}/move`, payload)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setData(res.data);
        } else {
          throw res;
        }
      })
      .catch(() => {

      });
  }

  useEffect(() => {
    // Mock username
    setUsername(Math.floor(Math.random() * 2) ? 'jonas' : 'Rasmus');

    axios.get(`${baseUrl}api/game/${paramId}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setData(res.data);
          pollData();
        }
      })
      .catch(() => {
        pollData();
      });
  }, []);
  return (
    <div className="game-container">
      <PlayerList players={data.players} turn={getPlayerTurn()} />
      <Modal title={isWinner ? 'Winner' : 'Loser'} content={gameResultContent()} show={showWinnerModal} close={closeWinnerModal} />

      <div className="board-container">
        { Object.keys(data).length
          ? <ChessBoard color={getColor(data, username)} fenKey={data.fen} postMove={postMove} />
          : null}
      </div>
      <HistoryList history={data.history} />
    </div>
  );
}

export default GamePage;
