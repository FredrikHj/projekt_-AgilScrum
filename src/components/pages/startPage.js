import React, { useState } from 'react';
import {
  Redirect,
} from 'react-router-dom';
import updateLocalstorage from '../localStorage';
import Button from '../Button/Button';

function StartPage() {
  const [userName, setUserName] = useState('');
  const [gotoLobby, setGotoLobby] = useState(false);

  const runUserName = (e) => {
    const targetStr = e.target.value;
    setUserName(targetStr);
  };

  const submitUserName = () => {
    if (userName.length > 0) {
      updateLocalstorage(userName);
      setGotoLobby(true);
    }
  };

  return (
    <div className="loginContainer">
      {

        gotoLobby && (<Redirect to="/lobby" />)
      }
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
            type="submit"
            patchLink={false}
            patchTo="/lobby"
            addedClassNames="loginButton maxWidth"
            name="Join game"
            bFunction={submitUserName}
          />
        </div>

      </section>
    </div>
  );
}

export default StartPage;
