/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const assert = require('assert');
const request = require('supertest');
const app = require('./server.js');

describe('backend tests', function() {
  describe('GET /api/lobby', function() {
    it('should respond with json', async () => {
      const res = await request(app)
        .get('/api/lobby')
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
    });
  });

  describe('POST /api/lobby', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .post('/api/lobby')
        .send({
          gameName: 'EPIC GAME',
          player: {
            playerName: 'Katla'
          }
        });
      expect(res.body.gameName).toEqual('EPIC GAME');
      expect(res.body.players[0].playerName).toEqual('Katla');
      expect(res.statusCode).toEqual(201);
    });

    it('should cleanup', async () => {
      const res = await request(app).delete('/api/lobby');
      expect(res.statusCode).toEqual(200);
    });
  });

  afterAll(() => {
    setTimeout(() => process.exit(), 1000);
  });
});
