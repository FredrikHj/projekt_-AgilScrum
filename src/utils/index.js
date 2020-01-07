const toDest = (validMoves) => {
  const rv = {};
  validMoves.forEach((move) => {
    if (rv[move.from]) {
      rv[move.from].push(move.to);
    } else {
      rv[move.from] = [move.to];
    }
  });
  return rv;
};

const getTurnColor = (playerColor, turn) => (turn === playerColor ? '#ffb048' : '#ccc');

const getColor = (data, username) => {
  const currentPlayer = data.players.find((player) => player.playerName === username);
  return currentPlayer ? currentPlayer.color : undefined;
};

module.exports.toDest = toDest;
module.exports.getColor = getColor;
module.exports.getTurnColor = getTurnColor;
