import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { updateLocalstorage } from '../localStorage.js';
import { Button } from '../Button.js';

function StartPage(props) {
  const [ userName, setUserName ] = useState(null);

  const runUserName = (e) => {
    const targetStr = e.target.value;
    console.log(targetStr);
    
    updateLocalstorage(targetStr);
    setUserName(targetStr);
}
console.log(userName);

  return (
    <section className="chessLandingPage">
      <div id="userNameContainer">
        <label id="userName">Username --></label>
        <input type="text" id="userName" className="input" onChange={ runUserName } value={ userName } />
      </div>
      <Button 
            className=""
            name={
              <Link to="/lobby">
                GoTo Lobby
              </Link>
            }
            function={ '' }
        /> 
    </section>
          
            
  );
}

export default StartPage;
