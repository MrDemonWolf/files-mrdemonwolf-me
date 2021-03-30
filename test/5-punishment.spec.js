/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/index');

let bannedCookie = null;
let suspendedCookie = null;

describe('Punishment', () => {
  describe('LOGIN as banned user', () => {
    it('it should has status code 200', done => {
      supertest
        .agent(app)
        .post('/login/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'banned@mrdemonwolf.github.io',
          password: 'banned@mrdemonwolf.github.io'
        })
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bannedCookie = res.header['set-cookie'];
          done();
        });
    });
  });
  describe('GET / (With user that is banned)', () => {
    it('it should has status code 401', done => {
      supertest(app)
        .get('/')
        .set('Cookie', bannedCookie)
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('LOGIN as suspended user', () => {
    it('it should has status code 200', done => {
      supertest
        .agent(app)
        .post('/login/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'suspended@mrdemonwolf.github.io',
          password: 'suspended@mrdemonwolf.github.io'
        })
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          suspendedCookie = res.header['set-cookie'];
          done();
        });
    });
  });
  describe('GET / (With user that is suspended)', () => {
    it('it should has status code 401', done => {
      supertest(app)
        .get('/')
        .set('Cookie', suspendedCookie)
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
