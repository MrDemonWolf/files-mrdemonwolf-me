/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/index');

describe('GET Index', () => {
  describe('GET /', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
