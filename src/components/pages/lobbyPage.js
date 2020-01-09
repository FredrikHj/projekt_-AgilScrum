import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Config';
import './lobbyPage.css';
import GameList from '../GameList/GameList';
import GameCreation from '../GameCreation/GameCreation';

function LobbyPage() {
  const [userName, setUserName] = useState(false);
  const [data, setData] = useState([]);

  function pollData(path) {
    if (window.location.pathname !== path) return;
    setTimeout(() => {
      axios.get(`${baseUrl}api/lobby`)
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            setData(res.data);
            pollData('/lobby');
          }
        })
        .catch(() => {
          pollData('/lobby');
        });
    }, 2000);
  }

  useEffect(() => {
    setUserName(localStorage.getItem('userName'));
    axios.get(`${baseUrl}api/lobby`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setData(res.data);
          pollData('/lobby');
        }
      })
      .catch(() => {
        pollData('/lobby');
      });
  }, []);

  return (
    <div className="lobby-container">
      <GameList games={data} playerName={userName} />
      <GameCreation playerName={userName} />
    </div>
  );
}

export default LobbyPage;
