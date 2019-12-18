const express = require('express');
const app = express();
const PORT = process.env.PORT || 1234;
const fs = require('fs');
const bodyParser = require('body-parser');

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.use(express.json());

let mock;
fs.readFile('./server/mock.json', (err, data) => {
  if (err) throw err;
  mock = data;
});

app.get('/api/lobby', (req, res) => {
  res.status(200).send(JSON.parse(mock));
});
