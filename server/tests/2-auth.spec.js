const request = require('supertest');

const server = require('../index');
const User = require('../models/User');

/**
 * Load Configs
 */
const testAccounts = require('./data/testAccounts');

/**
 * Create a empty object for creds to be used later
 */
// eslint-disable-next-line prefer-const
let creds = {
  user: {
    token: '',
    refreshToken: ''
  },
  admin: {
    token: '',
    refreshToken: ''
  },
  owner: {
    token: '',
    refreshToken: ''
  }
};

describe('🔐 Auth:', () => {
  describe('🔑 register', () => {
    it('should register a new user', done => {
      request(server)
        .post('/auth/register')
        .send({
          username: testAccounts.user.username,
          email: testAccounts.user.email,
          password: testAccounts.user.password
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }

          try {
            const user = await User.findOne({ email: testAccounts.user.email });
            user.emailVerified = true;
            user.emailVerificationToken = undefined;
            user.emailVerificationTokenExpire = undefined;
            await user.save();
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
    it('should register a new user (admin user)', done => {
      request(server)
        .post('/auth/register')
        .send({
          username: testAccounts.admin.username,
          email: testAccounts.admin.email,
          password: testAccounts.admin.password
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            const user = await User.findOne({
              email: testAccounts.admin.email
            });
            user.emailVerified = true;
            user.emailVerificationToken = undefined;
            user.emailVerificationTokenExpire = undefined;
            await user.save();
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
    it('should register a new user (owner user)', done => {
      request(server)
        .post('/auth/register')
        .send({
          username: testAccounts.owner.username,
          email: testAccounts.owner.email,
          password: testAccounts.owner.password
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            const user = await User.findOne({
              email: testAccounts.owner.email
            });
            user.emailVerified = true;
            user.emailVerificationToken = undefined;
            user.emailVerificationTokenExpire = undefined;
            await user.save();
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
  describe('🔓 login', () => {
    it('should login as user', done => {
      request(server)
        .post('/auth/login')
        .send({
          email: testAccounts.user.email,
          password: testAccounts.user.password
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            creds.user.token = res.body.token;
            creds.user.refreshToken = res.body.refreshToken;
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
    it('should login as admin', done => {
      request(server)
        .post('/auth/login')
        .send({
          email: testAccounts.admin.email,
          password: testAccounts.admin.password
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            creds.admin.token = res.body.token;
            creds.admin.refreshToken = res.body.refreshToken;
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
    it('should login as owner', done => {
      request(server)
        .post('/auth/login')
        .send({
          email: testAccounts.owner.email,
          password: testAccounts.owner.password
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            creds.owner.token = res.body.token;
            creds.owner.refreshToken = res.body.refreshToken;
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
  describe('🔒 logout', () => {
    it('should logout as user', done => {
      request(server)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${creds.user.token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          done(err);
        });
    });
    it('should logout as admin', done => {
      request(server)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${creds.admin.token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          done(err);
        });
    });
    it('should logout as owner', done => {
      request(server)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${creds.owner.token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          done(err);
        });
    });
  });
  describe('📧 Auth: email verification', () => {});
});
