import React, { useEffect } from 'react';
import { Chessground } from 'chessground';
import Chess from 'chess.js';
import './chessground.css';
import './theme.css';
import { toDest } from '../../utils';

let cg = null;
let chess = null;

function ChessBoard({
  fenKey, postMove, color, promotePiece, checkmateCb,
}) {
  function checkPromotion(from, to) {
    const validMoves = chess.moves({ square: from, verbose: true });
    const idx = validMoves.findIndex(
      (validMove) => validMove.from === from && validMove.to === to && validMove.promotion,
    );
    return idx !== -1;
  }

  function inCheck() {
    if (chess.in_check()) cg.set({ check: true });
  }

  function inCheckmate() {
    if (chess.in_checkmate()) {
      checkmateCb(chess.turn());
    }
  }

  function chessMakeMove(from, to) {
    return new Promise((resolve) => {
      if (checkPromotion(from, to)) {
        // DO WHEN PROMOTING
        promotePiece(color)
          .then((val) => {
            chess.move({ from, to, promotion: val });
            cg.set({
              fen: chess.fen(),
            });
            resolve();
          });
      } else {
        chess.move({ from, to });
        resolve();
      }
      inCheckmate(); // DO WHEN CHECKMATE
      inCheck(); // DO WHEN CHECK
    });
  }

  function afterMovePiece(before, after) {
    chessMakeMove(before, after)
      .then(() => {
        postMove(chess.fen(), before, after);
      });
  }

  function createChessground() {
    const boardContainer = document.querySelector('.board');
    chess = new Chess();
    chess.load(fenKey);
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
      turnColor: chess.turn() === 'w' ? 'white' : 'black',
    });
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
        check: false,
      });
      inCheck();
      inCheckmate();
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
