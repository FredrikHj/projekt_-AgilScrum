import React from 'react';
import ChessBoard from '../ChessBoard/ChessBoard';

function gamePage() {
  return (
    <div className="board-container">
      <ChessBoard color="white" />
    </div>
  );
}

export default gamePage;
