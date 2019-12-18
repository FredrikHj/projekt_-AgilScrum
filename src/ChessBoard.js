import React from 'react';
import './App.css';
import Chess from 'chess.js';

function App() {
  const chess = new Chess();
  var chess = new Chess();
  let test = chess.in_draw();
  //const test = chess.board();

  return (
    <div className="App">
      <p>Hello Chessplayer!</p>
      { test }
    </div>
  );
}

export default App;
