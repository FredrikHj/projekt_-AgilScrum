import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import './gamePage.css';
import Chess from 'chess.js';
import ChessBoard from '../ChessBoard/ChessBoard';
import PlayerList from '../PlayerList/PlayerList';
import PromotionList from '../PromotionList/PromotionList';
import HistoryList from '../HistoryList/HistoryList';
import { baseUrl } from '../../Config';
import Modal from '../Modal/Modal';
import { getColor } from '../../utils';
import Button from '../Button/Button';

const chessJs = new Chess();

let promotionPiece = null;
let pollingTimeout = null;

function GamePage({ match }) {
  const paramId = match.params.id;
  const [data, setData] = useState({});
  const [username, setUsername] = useState('');
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [showPromotionModal, setShowPromotionModal] = useState(false);
  const [promotionColor, setPromotionColor] = useState('');
  const [redirectLobby, setRedirectLobby] = useState(false);

  function asyncPromote() {
    return new Promise((resolve) => {
      const promoteInterval = setInterval(() => {
        if (promotionPiece) {
          const rv = promotionPiece;
          promotionPiece = null;
          clearInterval(promoteInterval);
          resolve(rv);
        }
      }, 200);
    });
  }

  function promotePiece(color) {
    setPromotionColor(color);
    setShowPromotionModal(true);
    return asyncPromote();
  }

  function choosePromote(piece) {
    promotionPiece = piece;
    setShowPromotionModal(false);
  }

  function gameResultCallback(colorLost) {
    const playerColor = getColor(data, username) === 'white' ? 'w' : 'b';
    if (playerColor !== colorLost) setIsWinner(true);
    setShowWinnerModal(true);
  }

  function endGame() {
    clearTimeout(pollingTimeout);
    axios.delete(`${baseUrl}api/game/${paramId}`)
      .then(() => {
        setRedirectLobby(true);
      })
      .catch(() => {
        setRedirectLobby(true);
      });
  }

  function gameResultContent() {
    if (isWinner) {
      return (
        <>
          <span>Congratulations you won!</span>
          <Button type="button" name="Return to lobby" patchLink={false} bFunction={endGame} />
        </>

      );
    }
    return (
      <>
        <span>You lost this one, better luck next time!</span>
        <Button type="button" name="Return to lobby" patchLink={false} bFunction={endGame} />
      </>
    );
  }

  function pollData() {
    pollingTimeout = setTimeout(() => {
      clearTimeout(pollingTimeout);
      axios.get(`${baseUrl}api/game/${paramId}`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            setData(res.data);
            pollData();
          }
        })
        .catch(() => {
          clearTimeout(pollingTimeout);
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

  useEffect(() => () => {
    // console.log('UNMOUNT');
    clearTimeout(pollingTimeout);
  }, []);

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
      {
        redirectLobby ? <Redirect to="/lobby" /> : null
      }
      <PlayerList players={data.players} turn={getPlayerTurn()} />
      <Modal title="CHECKMATE" content={gameResultContent()} show={showWinnerModal} />
      <Modal title="Choose promotion" content={<PromotionList color={promotionColor} promoteFunc={choosePromote} />} show={showPromotionModal} />

      <div className="board-container">
        { Object.keys(data).length
          ? (
            <ChessBoard
              color={getColor(data, username)}
              fenKey={data.fen}
              postMove={postMove}
              promotePiece={promotePiece}
              checkmateCb={gameResultCallback}
            />
          )
          : null}
      </div>
      <HistoryList history={data.history} />
    </div>
  );
}

export default GamePage;
