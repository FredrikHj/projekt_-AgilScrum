/* eslint-env mocha */
/* eslint-disable prefer-arrow-callback, func-names */

const request = require('supertest');
const app = require('./server.js');

describe('/api', () => {
  describe('GET /api/lobby', () => {
    it('should fetch all games and make sure it responds with JSON', async (done) => {
      const res = await request(app)
        .get('/api/lobby')
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  describe('POST /api/lobby', () => {
    it('should create a new post', async (done) => {
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
      done();
    });
  });

  describe('GET /api/game/:id', () => {
    let id;
    it('should fetch all games and make sure it responds with JSON', async (done) => {
      const res = await request(app)
        .get('/api/lobby')
        .set('Accept', 'application/json');
      id = res.body[0].id;
      expect(res.statusCode).toEqual(200);
      done();
    });

    it('should fetch specific game and make sure it responds with JSON', async (done) => {
      const res = await request(app)
        .get(`/api/game/${id}`)
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(200);
      done();
    });

    it("should return an error if id doesn't match any game", async (done) => {
      const res = await request(app)
        .get('/api/game/594381754891738945')
        .set('Accept', 'application/json');

      expect(res.statusCode).toEqual(404);
      done();
    });
  })

  describe('POST /api/game/:id/move', () => {
    let id;
    it('should fetch all games and make sure it responds with JSON', async (done) => {
      const res = await request(app)
        .get('/api/lobby')
        .set('Accept', 'application/json');
      id = res.body[0].id;
      expect(res.statusCode).toEqual(200);
      done();
    });

    it('should update fen key', async (done) => {
      let obj = {
        fen: "test",
        move: { to: "e4", from: "e6" }
      };

      const res = await request(app)
        .post(`/api/game/${id}/move`)
        .send(obj)

      expect(res.statusCode).toEqual(200);
      done();
    });

    it('should return error if fen key or move is missing', async (done) => {
      let obj = {};

      const res = await request(app)
        .post(`/api/game/${id}/move`)
        .send(obj)

      expect(res.statusCode).toEqual(400);
      done();
    });
  })

  afterAll(() => {
    setTimeout(() => process.exit(), 1000);
  });
});
