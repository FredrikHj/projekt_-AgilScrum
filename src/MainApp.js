import React, { useState, useEffect } from 'react';

// React Router - ES6 modules
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";

import './Chess.css';
import { Button } from './Components/Button.js';
import { NewGameModal } from './Components/NewGameModal.js';

const MainApp = () => {
  return (
    <div className="App">
      <p>Hello Chessplayer!</p>
      <Router>
        <Route exact path="/" component={ LandingPage }/> 

      </Router>
      <Button 
        name="Hej"
        function={ '' }
      /> 
      <NewGameModal />
    </div>
  );
}

export default MainApp;
