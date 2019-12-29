import React, { useEffect } from 'react';
import { Chessground } from 'chessground';
import Chess from 'chess.js';
import './chessground.css';
import './theme.css';

function ChessBoard(props) {
  let cg = null;
  let chess = null;

  /* function validateMove(from, to) {
    const validMoves = chess.moves({ verbose: true });
    const idx = validMoves.findIndex((validMove) => validMove.from === from && validMove.to === to);
    return idx !== -1;
  } */

  function checkPromotion(from, to) {
    const validMoves = chess.moves({ square: from, verbose: true });
    const idx = validMoves.findIndex(
      (validMove) => validMove.from === from && validMove.to === to && validMove.promotion,
    );
    return idx !== -1;
  }

  function toDest(validMoves) {
    const rv = {};
    validMoves.forEach((move) => {
      if (rv[move.from]) {
        rv[move.from].push(move.to);
      } else {
        rv[move.from] = [move.to];
      }
    });
    return rv;
  }

  function chessMakeMove(from, to) {
    if (checkPromotion(from, to)) {
      // DO WHEN PROMOTING
      chess.put({ type: 'q', color: 'w' }, from);
    }
    chess.move({ from, to });
    if (chess.in_checkmate()) {
      // DO WHEN CHECKMATE
    } else if (chess.in_check()) {
      // DO WHEN CHECK
    }
  }

  function setColorTurn(color) {
    cg.set({
      movable: { color: color === 'white' ? 'black' : 'white', dests: toDest(chess.moves({ verbose: true })) },
    });
  }

  function afterMovePiece(before, after) {
    chessMakeMove(before, after);
    setColorTurn(cg.state.movable.color);
  }

  function createChessground() {
    const boardContainer = document.querySelector('.board');
    chess = new Chess();
    cg = Chessground(boardContainer, {
      movable: {
        events: { after: afterMovePiece },
        color: props.color,
        dests: toDest(chess.moves({ verbose: true })),
        free: false,
      },
      coordinates: false,
      orientation: props.color,
    });
  }

  useEffect(() => {
    createChessground();
  }, []);

  return (
    <div className="blue merida">
      <div className="board" />
    </div>
  );
}

export default ChessBoard;
