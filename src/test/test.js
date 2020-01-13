/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */
const assert = require('assert');
const { toDest, getTurnColor, getColor } = require('../utils/index');


describe('Tests', function () {
  describe('toDest function', function () {
    let data;
    let expected;
    it('should return correct formatted data', function () {
      data = [
        {
          color: 'w', from: 'a2', to: 'a3', flags: 'n', piece: 'p', san: 'a3',
        },
        {
          color: 'w', from: 'a2', to: 'a4', flags: 'b', piece: 'p', san: 'a4',
        },
        {
          color: 'w', from: 'b2', to: 'b3', flags: 'n', piece: 'p', san: 'b3',
        },
        {
          color: 'w', from: 'b2', to: 'b4', flags: 'b', piece: 'p', san: 'b4',
        },
        {
          color: 'w', from: 'c2', to: 'c3', flags: 'n', piece: 'p', san: 'c3',
        },
        {
          color: 'w', from: 'c2', to: 'c4', flags: 'b', piece: 'p', san: 'c4',
        },
      ];
      expected = {
        a2: ['a3', 'a4'],
        b2: ['b3', 'b4'],
        c2: ['c3', 'c4'],
      };
      assert.deepStrictEqual(toDest(data), expected);
    });
    it('should return correct format when only from and to is sent', function () {
      data = [
        { from: 'a2', to: 'a3' },
        { from: 'a2', to: 'a4' },
        { from: 'b2', to: 'b3' },
        { from: 'b2', to: 'b4' },
        { from: 'c2', to: 'c3' },
        { from: 'c2', to: 'c4' },
      ];
      expected = {
        a2: ['a3', 'a4'],
        b2: ['b3', 'b4'],
        c2: ['c3', 'c4'],
      };
      assert.deepStrictEqual(toDest(data), expected);
    });
  });
  describe('getTurnColor function', function () {
    const playerColor = 'white';
    let turnColor = 'white';
    it('Should return golden color (#ffb048) if data does match', function () {
      assert.strictEqual(getTurnColor(playerColor, turnColor), '#ffb048');
    });
    it('Should return grayish color (#ccc) if data does not match', function () {
      turnColor = 'black';
      assert.strictEqual(getTurnColor(playerColor, turnColor), '#ccc');
    });
  });
  describe('getColor function', function () {
    let mockId = '77b43e70-2e1a-11ea-9f75-f19bab93d385';
    const mockData = {
      id: '77b41760-2e1a-11ea-9f75-f19bab93d385',
      gameName: 'Peters game',
      fen: 'rnb2bnr/pp4pp/2p2k2/8/Q7/8/PPPQP2P/RNB1KBNR w KQ - 0 11',
      players: [
        { id: '77b43e70-2e1a-11ea-9f75-f19bab93d385', playerName: 'Peter', color: 'white' },
        { id: '77b43e70-2e1a-11ec-9f75-f19bab93d384', playerName: 'Kalle', color: 'black' },
      ],
    };
    it('Should return color (white) for chosen username', function () {
      assert.strictEqual(getColor(mockData, mockId), 'white');
    });
    it('Should return color (black) for chosen username', function () {
      mockId = '77b43e70-2e1a-11ec-9f75-f19bab93d384';
      assert.strictEqual(getColor(mockData, mockId), 'black');
    });
    it('Should return undefined if user not found', function () {
      mockId = '77b43e70-2e1a-11ec-9f75-f19bab93d';
      assert.strictEqual(getColor(mockData, mockId), undefined);
    });
  });
});
