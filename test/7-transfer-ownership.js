/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/index');

let ownerCookie = null;

describe('Transfer Ownership', () => {
  describe('LOGIN as user', () => {
    it('it should has status code 200', done => {
      supertest
        .agent(app)
        .post('/login/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'owner@mrdemonwolf.github.io',
          password: 'owner@mrdemonwolf.github.io'
        })
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ownerCookie = res.header['set-cookie'];
          done();
        });
    });
  });
  describe('POST /admin/settings/ownership', () => {
    it('it should has status code 302', done => {
      supertest
        .agent(app)
        .post('/login/')
        .set('Cookie', ownerCookie)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          slug: 'admin@mrdemonwolf.github.io'
        })
        .expect(302)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
