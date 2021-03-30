/* eslint-disable no-undef */
const supertest = require('supertest');
const chai = require('chai');
const app = require('../src/index');
const User = require('../src/models/User');

const { assert, expect } = chai;
const should = chai.should();

describe('Auth Routes', () => {
  describe('GET /login', () => {
    it('it should return status 200 if rendered', done => {
      supertest(app)
        .get('/login')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /signup', () => {
    it('it should return status 200 if rendered', done => {
      supertest(app)
        .get('/signup')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('POST /signup to create user', () => {
    it('it should return status 302', done => {
      supertest(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'user@mrdemonwolf.github.io',
          email: 'user@mrdemonwolf.github.io',
          password: 'user@mrdemonwolf.github.io'
        })
        .expect(302)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          const user = await User.findOne({
            email: 'user@mrdemonwolf.github.io'
          });
          user.emailVerified = true;
          user.emailVerificationToken = undefined;
          user.emailVerificationTokenExpire = undefined;
          await user.save();
          done();
        });
    });
  });

  describe('POST /signup to create banned', () => {
    it('it should return status 302', done => {
      supertest(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'banned@mrdemonwolf.github.io',
          email: 'banned@mrdemonwolf.github.io',
          password: 'banned@mrdemonwolf.github.io'
        })
        .expect(302)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          const user = await User.findOne({
            email: 'banned@mrdemonwolf.github.io'
          });
          user.emailVerified = true;
          user.emailVerificationToken = undefined;
          user.emailVerificationTokenExpire = undefined;
          await user.save();
          done();
        });
    });
  });

  describe('POST /signup to create suspended', () => {
    it('it should return status 302', done => {
      supertest(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'suspended@mrdemonwolf.github.io',
          email: 'suspended@mrdemonwolf.github.io',
          password: 'suspended@mrdemonwolf.github.io'
        })
        .expect(302)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          const user = await User.findOne({
            email: 'suspended@mrdemonwolf.github.io'
          });
          user.emailVerified = true;
          user.emailVerificationToken = undefined;
          user.emailVerificationTokenExpire = undefined;
          await user.save();
          done();
        });
    });
  });

  describe('POST /signup (admin)', () => {
    it('it should return status 302', done => {
      supertest(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'admin@mrdemonwolf.github.io',
          email: 'admin@mrdemonwolf.github.io',
          password: 'admin@mrdemonwolf.github.io'
        })
        .expect(302)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          const user = await User.findOne({
            email: 'admin@mrdemonwolf.github.io'
          });
          user.emailVerified = true;
          user.emailVerificationToken = undefined;
          user.emailVerificationTokenExpire = undefined;
          user.role = 'admin';
          await user.save();
          done();
        });
    });
  });
  describe('POST /signup (owner)', () => {
    it('it should return status 302', done => {
      supertest(app)
        .post('/signup')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'owner@mrdemonwolf.github.io',
          email: 'owner@mrdemonwolf.github.io',
          password: 'owner@mrdemonwolf.github.io'
        })
        .expect(302)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          const user = await User.findOne({
            email: 'owner@mrdemonwolf.github.io'
          });
          user.emailVerified = true;
          user.emailVerificationToken = undefined;
          user.emailVerificationTokenExpire = undefined;
          user.role = 'owner';
          await user.save();
          done();
        });
    });
  });
});
