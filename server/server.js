const express = require('express');

const app = express();
const PORT = process.env.PORT || 80;
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

let games = [];

app.listen(PORT, () => {
  fs.readFile('./server/games.json', 'utf8', (err, data) => {
    if (err) throw err;
    games = JSON.parse(data);
  });
  console.log(`Listening on ${PORT}`);
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

app.get('/api/lobby', (req, res) => {
  res.status(200).send(games);
});

app.post('/api/lobby', (req, res) => {
  const body = req.body;

  if (!body.gameName || !body.playerName) {
    res.status(400).send({ error: 'game name or player name is missing!' });
    return;
  }

  try {
    const game = {
      id: uuid(),
      gameName: body.gameName,
      players: [
        {
          id: uuid(),
          playerName: body.playerName,
          color: 'white'
        }
      ],
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      history: []
    };
    games.push(game);
    fs.writeFile('./server/games.json', JSON.stringify(games), err => {
      if (err) throw err;
    });
    res.status(201).send(game);
  } catch (err) {
    res.status(400).send({ error: 'Could not create game, try again!' });
    throw err;
  }
});

app.get('/api/game/:id', (req, res) => {
  const g = games.filter((game) => {
    return game.id === req.params.id
  })[0] || {}

  if (!Object.entries(g).length) {
    res.status(404).send({ error: 'game could not be found!' });
    return;
  }

  res.status(200).send(g);
});

app.delete('/api/game/:id', (req, res) => {
  const id = req.params.id;

  gamesCopy = games.filter((game) => {
    return game.id !== id
  })

  if (gamesCopy.length === games.length) {
    res.status(400).send({ error: 'game could not be found!' });
    return;
  }

  try {
    games = gamesCopy;
    fs.writeFile('./server/games.json', JSON.stringify(games), err => {
      if (err) throw err;
    });
    res.status(200).send({ message: 'game deleted!' });
    return;
  } catch (err) {
    res.status(500).send({ error: 'internal server error' });
  }
});

app.post('/api/game/:id/move', (req, res) => {
  let g = {}
  let newMove = req.body;

  if (!newMove.fen || !newMove.move) {
    res.status(400).send({ error: 'fen key or move is missing!' })
    return;
  }

  for (let game of games) {
    if (game.id === req.params.id) {
      let nm = {
        id: uuid(),
        ...newMove.move
      }
      game.fen = newMove.fen;
      game.history.push(nm);
      g = game;
    }
  }

  if (!Object.entries(g).length) {
    res.status(404).send({ error: 'something went wrong...' });
    return;
  }

  fs.writeFile('./server/games.json', JSON.stringify(games), err => {
    if (err) throw err;
  });

  res.status(200).send(g);
})

app.post('/api/game/:id/join', (req, res) => {
  const id = req.params.id;
  const name = req.body.playerName;

  if (!id || !name) {
    res.status(400).send({ error: 'room id or name is missing!' });
    return;
  }

  for (let game of games) {
    if (game.id === id) {
      if (game.players.length === 1) {
        try {
          const newPlayer = {
            id: uuid(),
            playerName: name,
            color: 'black'
          }
          game.players.push(newPlayer);
          fs.writeFile('./server/games.json', JSON.stringify(games), err => {
            if (err) throw err;
            res.status(200).send({
              message: 'joined',
              player: newPlayer,
              gameId: game.id
            });
            return;
          });
          return;
        } catch (err) {
          res.status(500).send({ error: 'internal server error' })
          return;
        }
      } else {
        res.status(403).send({ error: 'game is full!' });
        return;
      }
    }
  }
  res.status(400).send({ error: 'game could not be found...' });
})

module.exports = app;
