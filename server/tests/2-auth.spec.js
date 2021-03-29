const request = require('supertest');

const server = require('../index');
const User = require('../models/User');

/**
 * Load Configs
 */
const testAccounts = require('./data/testAccounts.json');

/**
 * Create a empty object for creds to be used later
 */
const creds = {
  user: {
    accessToken: '',
    refreshToken: ''
  },
  admin: {
    accessToken: '',
    refreshToken: ''
  },
  owner: {
    accessToken: '',
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
        .expect(201)
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
        .expect(201)
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
            user.role = 'admin';
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
        .expect(201)
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
            user.role = 'owner';
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
            creds.user.accessToken = res.body.access_token;
            creds.user.refreshToken = res.body.refresh_token;
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
            creds.admin.accessToken = res.body.access_token;
            creds.admin.refreshToken = res.body.refresh_token;
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
            creds.owner.accessToken = res.body.access_token;
            creds.owner.refreshToken = res.body.refresh_token;
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
  describe('🔑 Refresh', () => {
    it('should refresh user access token', done => {
      request(server)
        .post('/auth/refresh')
        .send({
          refresh_token: creds.user.refreshToken
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            creds.user.accessToken = res.body.access_token;
            creds.user.refreshToken = res.body.refresh_token;
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
        .set('Authorization', `Bearer ${creds.user.accessToken}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('should logout as admin', done => {
      request(server)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${creds.admin.accessToken}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('should logout as owner', done => {
      request(server)
        .post('/auth/logout')
        .set('Authorization', `Bearer ${creds.owner.accessToken}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
});
