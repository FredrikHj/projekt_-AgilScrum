import React, { useEffect } from 'react';
import { Chessground } from 'chessground';
import Chess from 'chess.js';
import './chessground.css';
import './theme.css';

let cg = null;
let chess = null;

function ChessBoard({ fenKey, postMove, color }) {
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

  function afterMovePiece(before, after) {
    chessMakeMove(before, after);
    postMove(chess.fen());
  }

  function createChessground() {
    const boardContainer = document.querySelector('.board');
    chess = new Chess();
    cg = Chessground(boardContainer, {
      movable: {
        events: { after: afterMovePiece },
        color,
        dests: toDest(chess.moves({ verbose: true })),
        free: false,
      },
      coordinates: false,
      orientation: color,
      fen: fenKey,
    });
    chess.load(fenKey);
  }

  useEffect(() => {
    if (cg && chess) {
      cg.set({
        fen: fenKey,
      });
      chess.load(fenKey);
      const turnColor = chess.turn() === 'w' ? 'white' : 'black';
      cg.set({
        turnColor,
        movable: {
          dests: toDest(chess.moves({ verbose: true })),
        },
      });
    }
  }, [fenKey]);

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
