import React, { useState } from 'react';
import { updateLocalstorage } from '../localStorage';
import Button from '../Button/Button';

function StartPage() {
  const [userName, setUserName] = useState('');
  const link = true;

  const runUserName = (e) => {
    const targetStr = e.target.value;

    updateLocalstorage(targetStr);
    setUserName(targetStr);
  };


  return (
    <div className="loginContainer">
      <section className="subPagesContainer">
        <h1 className="loginUserText">Username</h1>
        <div className="userNameContainer">
          <label htmlFor="userName">
            Username
            <input type="text" id="userName" className="input inputUsername" onChange={runUserName} value={userName} />
          </label>
        </div>
        <div className="userNameContainer">
          <Button
            patchLink={link}
            patchTo="/lobby"
            className="loginButton"
            name="Join game"
            function=""
          />
        </div>

      </section>
    </div>
  );
}

export default StartPage;
