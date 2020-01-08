/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const assert = require('assert');
const { toDest } = require('../utils/index');

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
});
