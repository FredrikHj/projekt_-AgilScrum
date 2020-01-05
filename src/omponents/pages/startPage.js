import React, { useState } from 'react';
import updateLocalstorage from '../localStorage';
import Button from '../Button';

function StartPage() {
  const [userName, setUserName] = useState(null);
  const link = true;

  const runUserName = (e) => {
    const targetStr = e.target.value;

    updateLocalstorage(targetStr);
    setUserName(targetStr);
  };
  return (
    <section className="subPagesContainer">

      <div className="userNameContainer">
        <label htmlFor="userName">
          Username
          <input type="text" id="userName" className="input" onChange={runUserName} value={userName} />
        </label>
      </div>
      <Button
        patchLink={link}
        patchTo="/lobby"
        className=""
        name="GoTo Lobby"
        function=""
      />
    </section>
  );
}

export default StartPage;
