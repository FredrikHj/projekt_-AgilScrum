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

module.exports.toDest = toDest;
