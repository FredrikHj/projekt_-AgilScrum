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

module.exports.getTurnColor = getTurnColor;
module.exports.toDest = toDest;
