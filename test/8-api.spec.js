/* eslint-disable no-undef */
const supertest = require('supertest');
const path = require('path');
// const assert = require('assert');

const app = require('../src/index');

describe('API Routes', () => {
  describe('GET /api', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/api')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('API Version 1', () => {
    describe('GET /api/v1', () => {
      it('it should has status code 200', done => {
        supertest(app)
          .get('/api/v1')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
    describe('POST /api/v1/upload', () => {
      it('it should has status code 200', done => {
        // eslint-disable-next-line global-require
        const { token } = require('./3-user.spec');
        supertest(app)
          .post('/api/v1/upload')
          .set('authorization', `Bearer ${token.jwt}`)
          .attach('file', path.join(__dirname, './files/logo.png'))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            module.exports.deleteKey = res.body.file.deleteKey;
            done();
          });
      });
    });

    describe('GET /api/v1/delete (Remove the image we uplaoded)', () => {
      it('it should has status code 200', done => {
        // eslint-disable-next-line global-require
        const { token } = require('./3-user.spec');
        supertest(app)
          .get(`/api/v1/delete?key=${this.deleteKey}`)

          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
