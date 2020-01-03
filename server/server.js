const express = require('express');

const app = express();
const PORT = process.env.PORT || 80;
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

let games = [];


function updateGames(newGames) {
  //update games to newGames
  //write file
}

app.listen(PORT, () => {
  fs.readFile('./server/games.json', (err, data) => {
    if (err) throw err;
    games = JSON.parse(data);
  });
  console.log(`Listening on ${PORT}`);
});

app.use(bodyParser.json());

app.get('/api/lobby', (req, res) => {
  res.status(200).send(games);
});

app.post('/api/lobby', (req, res) => {
  const body = req.body;

  if (!body.gameName || !body.player.playerName) {
    res
      .status(400)
      .send({ error: 'Something went wrong during the game creation...' });
    return;
  }

  try {
    const game = {
      id: uuid(),
      gameName: body.gameName,
      players: [
        {
          id: uuid(),
          playerName: body.player.playerName,
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

app.delete('/api/lobby', (req, res) => {
  fs.writeFile('./server/games.json', '[]', err => {
    if (err) throw err;
  });
  res.status(200).send('games deleted!');
});

app.get('/api/game/:id', (req, res) => {
  let g = {}

  for (let game of games) {
    if (game.id === req.params.id) {
      g = game
    }
  }

  if (!Object.entries(g).length) {
    res.status(404).send({ error: 'game could not be found!' });
    return;
  }

  res.status(200).send(g);
});
/*
newMove = {
  fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  move: "{name:"jonas" to: "e4", from: "e6"}"
}
*/

app.post('/api/game/:id/move', (req, res) => {
  let g = {}
  let newMove = req.body;

  if (!newMove.fen || !newMove.move) {
    res.status(400).send({ error: 'fen key or move is missing!' })
    return;
  }

  for (let game of games) {
    if (game.id === req.params.id) {
      game.fen = newMove.fen;
      game.history.push(newMove.move);
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

app.delete(() => {
  /*
    when leaving game check players []
    if < 2, remove game
    also be called when game ends (game over)
  */
})

module.exports = app;
