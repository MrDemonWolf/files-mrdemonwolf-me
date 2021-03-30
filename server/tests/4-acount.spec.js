const request = require('supertest');

const { authenticator } = require('otplib');
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
  extra: {
    account: {
      accessToken: '',
      refreshToken: ''
    },
    twoFactor: {
      accessToken: '',
      refreshToken: ''
    }
  }
};

const emailChange = {
  emailVerificationToken: '',
  emailVerificationTokenExpire: ''
};

const twoFactor = {
  secret: '',
  token: '',
  backupCodes: []
};

let sessions = [];

describe('💾 Account:', () => {
  it('should register a user for testing account routes.', done => {
    request(server)
      .post('/auth/register')
      .send({
        username: testAccounts.extra.account.username,
        email: testAccounts.extra.account.email,
        password: testAccounts.extra.account.password
      })
      .expect(201)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const user = await User.findOne({
            email: testAccounts.extra.account.email
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
  it('should register a user for testing two factor routes.', done => {
    request(server)
      .post('/auth/register')
      .send({
        username: testAccounts.extra.twoFactor.username,
        email: testAccounts.extra.twoFactor.email,
        password: testAccounts.extra.twoFactor.password
      })
      .expect(201)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        try {
          const user = await User.findOne({
            email: testAccounts.extra.twoFactor.email
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
  it('should login as account user', done => {
    request(server)
      .post('/auth/login')
      .send({
        email: testAccounts.extra.account.email,
        password: testAccounts.extra.account.password
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        try {
          creds.extra.account.accessToken = res.body.access_token;
          creds.extra.account.refreshToken = res.body.refresh_token;
          done();
        } catch (err) {
          return done(err);
        }
      });
  });
  it('should get account details.', done => {
    request(server)
      .get('/account')
      .set('Authorization', `Bearer ${creds.extra.account.accessToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should requst account email change', done => {
    request(server)
      .post('/account/change-email')
      .set('Authorization', `Bearer ${creds.extra.account.accessToken}`)
      .send({
        email: testAccounts.extra.account.ec
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should resend email change verification', done => {
    request(server)
      .post('/account/change-email/resend')
      .set('Authorization', `Bearer ${creds.extra.account.accessToken}`)
      .send({
        email: testAccounts.extra.account.ec
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        try {
          const user = await User.findOne({
            email: testAccounts.extra.account.email
          });
          /**
           * Asign the tokens to a variable to use later in the tests.
           */
          emailChange.emailVerificationToken = user.emailVerificationToken;
          emailChange.emailVerificationTokenExpire =
            user.emailVerificationTokenExpire;
          done();
        } catch (err) {
          return done(err);
        }
      });
  });

  it('should change account email', done => {
    request(server)
      .put(`/account/change-email/${emailChange.emailVerificationToken}`)
      .set('Authorization', `Bearer ${creds.extra.account.accessToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should change account password', done => {
    request(server)
      .put('/account/change-password')
      .set('Authorization', `Bearer ${creds.extra.account.accessToken}`)
      .send({
        oldPassword: testAccounts.extra.account.password,
        newPassword: testAccounts.extra.account.password2
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should login as two factor user', done => {
    request(server)
      .post('/auth/login')
      .send({
        email: testAccounts.extra.twoFactor.email,
        password: testAccounts.extra.twoFactor.password
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        creds.extra.twoFactor.accessToken = res.body.access_token;
        creds.extra.twoFactor.refreshToken = res.body.refresh_token;
        done();
      });
  });

  it('should initialize the enable of two factor', done => {
    request(server)
      .post('/account/two-factor')
      .set('Authorization', `Bearer ${creds.extra.twoFactor.accessToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        twoFactor.secret = res.body.secret;
        twoFactor.backupCodes = res.body.backupCodes;
        done();
      });
  });

  it('should enable of two factor after initialize', done => {
    request(server)
      .put('/account/two-factor')
      .set('Authorization', `Bearer ${creds.extra.twoFactor.accessToken}`)
      .send({
        code: authenticator.generate(twoFactor.secret)
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should return two factor token if enabled', done => {
    request(server)
      .post('/auth/login')
      .send({
        email: testAccounts.extra.twoFactor.email,
        password: testAccounts.extra.twoFactor.password
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err || !res.body.twoFactor) {
          return done(err);
        }
        twoFactor.token = res.body.token;
        done();
      });
  });

  it('should login if a user has two factor', done => {
    request(server)
      .post('/auth/two-factor')
      .send({
        token: twoFactor.token,
        code: authenticator.generate(twoFactor.secret)
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        creds.extra.twoFactor.accessToken = res.body.access_token;
        creds.extra.twoFactor.refreshToken = res.body.refresh_token;
        done();
      });
  });

  it('should return two factor backup codes', done => {
    request(server)
      .get('/account/two-factor/backup-codes')
      .set('Authorization', `Bearer ${creds.extra.twoFactor.accessToken}`)
      .expect(200)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should disable of two factor after enable', done => {
    request(server)
      .delete(
        `/account/two-factor?code=${authenticator.generate(twoFactor.secret)}`
      )
      .set('Authorization', `Bearer ${creds.extra.twoFactor.accessToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('should login as user', done => {
    request(server)
      .post('/auth/login')
      .send({
        email: testAccounts.extra.account.ec,
        password: testAccounts.extra.account.password2
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

  it('should return a array of all current sessions', done => {
    request(server)
      .get('/account/sessions')
      .set('Authorization', `Bearer ${creds.user.accessToken}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }
        sessions = res.body.sessions;
        done();
      });
  });

  it('should revoke current session', done => {
    request(server)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/account/sessions/${sessions[0]._id}`)
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

  it('should login as user to revoke all', done => {
    request(server)
      .post('/auth/login')
      .send({
        email: testAccounts.extra.account.ec,
        password: testAccounts.extra.account.password2
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

  it('should login as user to revoke all 2', done => {
    request(server)
      .post('/auth/login')
      .send({
        email: testAccounts.extra.account.ec,
        password: testAccounts.extra.account.password2
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

  it('should revoke all session', done => {
    request(server)
      .delete('/account/sessions')
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
});
