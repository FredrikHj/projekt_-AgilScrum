import React from 'react';
import './App.css';
import routes from './routes/routes';
// import Chess from 'chess.js';

function App() {
  return (
    <div className="chessBody">
      {routes}
    </div>
  );
}

export default App;
