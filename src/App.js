import React from 'react';
import './App.css';
import routes from './routes/routes';
// import Chess from 'chess.js';

function App() {
  return (
    <section className="chessBody">
      {routes}
    </section>
  );
}

export default App;
