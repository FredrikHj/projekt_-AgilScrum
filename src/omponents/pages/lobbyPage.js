import React, { useState, useEffect } from 'react';
import Button from '../Button';

function LobbyPage() {
  const [userName, setUserName] = useState(false);
  const [gameName, setGameName] = useState(null);
  const [, setRunGame] = useState(false);
  const link = true;

  useEffect(() => {
    const getUserName = window.localStorage.getItem('userName');
    setUserName(getUserName);
  });
  const addNewGame = () => {
    setRunGame(true);
  };
  const runGameName = (e) => {
    const targetStr = e.target.value;

    setGameName(targetStr);
  };
  return (
    <section className="subPagesContainer gameListContainer">
      <h1>GameList!</h1>
      <section className="gameListContainer">

        <main className="mainLobyPage">
          <section>
            <h4>{ userName }</h4>
            <hr />
          </section>
          <section className="gameNamePart">
            <label htmlFor="gameName">
              <h4>
                Set GameName:
                <input type="text" id="gameName" className="input" onChange={runGameName} value={gameName} />
              </h4>
            </label>
            <Button
              patchLink={link}
              patchTo=""
              className=""
              name="Add Game"
              bFunction={addNewGame}
            />
          </section>


        </main>
      </section>
    </section>
  );
}

export default LobbyPage;
