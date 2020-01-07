/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const assert = require('assert');
const { toDest, getColor } = require('../utils/index');

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
  describe('getColor function', function () {
    let mockUsername = 'Peter';
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
      assert.strictEqual(getColor(mockData, mockUsername), 'white');
    });
    it('Should return color (black) for chosen username', function () {
      mockUsername = 'Kalle';
      assert.strictEqual(getColor(mockData, mockUsername), 'black');
    });
    it('Should return undefined if user not found', function () {
      mockUsername = 'Pelle';
      assert.strictEqual(getColor(mockData, mockUsername), undefined);
    });
  });
});
