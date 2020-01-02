const express = require('express');

const app = express();
const PORT = process.env.PORT || 80;
const fs = require('fs');
const bodyParser = require('body-parser');
const uuid = require('uuid/v1');

let games = [];

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
      console.log('The file has been saved!');
    });
    res.status(200).send(game);
  } catch (err) {
    res.status(400).send({ error: 'Could not create game, try again!' });
    throw err;
  }
});
