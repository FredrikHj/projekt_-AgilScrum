import React, { useState, useEffect } from 'react';
import Button from '../Button';

const gameListArr = [];
function LobbyPage() {
  const [userName, setUserName] = useState(false);
  const [gameName, setGameName] = useState(null);
  let [runCom, updateRunCom] = useState(0);

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
    updateRunCom(runCom);
  };
  const runGameName = (e) => {
    const targetStr = e.target.value;
    setGameName(targetStr);
  };
  console.log(gameListArr);

  return (
    <section className="subPagesContainer removeSomeFlexiPropp">
      <h1>Lobbyn!</h1>
      <section>
        <main className="mainLobyPage">
          <section className="fillOut50">
            <h4>{ `UserName: ${userName}` }</h4>
            <hr />
            <GameList />
          </section>
          <section className="fillOut50 gameNamePart">
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
            <section className="gameListContainer">
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
