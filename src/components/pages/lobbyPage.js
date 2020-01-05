import React, { useState, useEffect } from 'react';
import Button from '../Button';

const gameListArr = [];
function LobbyPage() {
  const [userName, setUserName] = useState(false);
  const [gameName, setGameName] = useState(null);
  let runCom = 0;
  const link = false;

  useEffect(() => {
    const getUserName = window.localStorage.getItem('userName');
    setUserName(getUserName);
  }, [runCom]);
  const addNewGame = () => {
    const gameListBody = {
      gameName, joinBtn: '',
    };
    gameListArr.push(gameListBody);

    runCom++;
  };
  const runGameName = (e) => {
    const targetStr = e.target.value;
    setGameName(targetStr);
  };
  console.log(gameListArr);

  return (
    <section className="subPagesContainer gameListContainer">
      <h1>Lobbyn!</h1>
      <section className="gameListContainer">

        <main className="mainLobyPage">
          <section>
            <h4>{ userName }</h4>
            <hr />
            <GameList />
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

const GameList = () => {
  const link = true;
  return (
    <>
      <h3>GameList</h3>
      {
        gameListArr.map((games) => (
          <>
            <section className="gameListcontainer">
              <div>
                {`ChessGame: ${games.gameName}`}
              </div>
              <div>
                <Button
                  patchLink={link}
                  patchTo=""
                  className=""
                  name="Join"
                  bFunction=""
                />

              </div>
            </section>
          </>
        ))
      }
    </>
  );
};
