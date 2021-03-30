/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/index');
const User = require('../src/models/User');

let userCookie = null;
let adminCookie = null;
let ownerCookie = null;

describe('Removing the created users', () => {
  describe('LOGIN as user', () => {
    it('it should has status code 200', done => {
      supertest
        .agent(app)
        .post('/login/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'user@mrdemonwolf.github.io',
          password: 'user@mrdemonwolf.github.io'
        })
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          userCookie = res.header['set-cookie'];
          done();
        });
    });
  });
  describe('DELETE user', () => {
    it('it should has status code 200', done => {
      supertest
        .agent(app)
        .delete('/account')
        .set('Cookie', userCookie)
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('LOGIN as admin', () => {
    it('it should has status code 200', done => {
      supertest
        .agent(app)
        .post('/login/')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          email: 'admin@mrdemonwolf.github.io',
          password: 'admin@mrdemonwolf.github.io'
        })
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          adminCookie = res.header['set-cookie'];
          done();
        });
    });
  });
  describe('DELETE admins', () => {
    it('it should has status code 200', done => {
      supertest
        .agent(app)
        .delete('/account')
        .set('Cookie', adminCookie)
        .expect(302)
        .expect('Location', '/')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('LOGIN as owner', () => {
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
  describe('DELETE owner', () => {
    it('it should has status code 302', done => {
      supertest
        .agent(app)
        .delete('/account')
        .set('Cookie', ownerCookie)
        .expect(302)
        .expect('Location', '/account')
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          const user = await User.findOne({
            email: 'owner@mrdemonwolf.github.io'
          });
          user.role = 'user';
          await user.save();
          done();
        });
    });
  });
  describe('DELETE owner (cleanup aka the owner is user now.)', () => {
    it('it should has status code 302', done => {
      supertest
        .agent(app)
        .delete('/account')
        .set('Cookie', ownerCookie)
        .expect(302)
        .expect('Location', '/')
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
