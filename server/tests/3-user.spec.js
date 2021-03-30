const request = require('supertest');

const server = require('../index');
const User = require('../models/User');

/**
 * Load Configs
 */
const testAccounts = require('./data/testAccounts.json');

const emailVerification = {
  emailVerificationToken: '',
  emailVerificationTokenExpire: ''
};

const passwordChange = {
  passwordResetToken: '',
  passwordResetTokenExpire: ''
};

describe('🧑 User:', () => {
  describe('🤖 Activate User:', () => {
    it('should create extra user for testing email verification', done => {
      request(server)
        .post('/auth/register')
        .send({
          username: testAccounts.extra.emailVerification.username,
          email: testAccounts.extra.emailVerification.email,
          password: testAccounts.extra.emailVerification.password
        })
        .expect(201)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
    it('should resend user account activate', done => {
      request(server)
        .post('/user/activate-account/resend')
        .send({
          email: testAccounts.extra.emailVerification.email
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            const user = await User.findOne({
              email: testAccounts.extra.emailVerification.email
            });
            /**
             * Asign the tokens to a variable to use later in the tests.
             */
            emailVerification.emailVerificationToken =
              user.emailVerificationToken;
            emailVerification.emailVerificationTokenExpire =
              user.emailVerificationTokenExpire;
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
    it('should activate account via email verification token', done => {
      request(server)
        .put(
          `/user/activate-account/${emailVerification.emailVerificationToken}`
        )
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
  describe('😅 Reset Password', () => {
    it('should create extra user for testing forgot password', done => {
      request(server)
        .post('/auth/register')
        .send({
          username: testAccounts.extra.passwordChange.username,
          email: testAccounts.extra.passwordChange.email,
          password: testAccounts.extra.passwordChange.password
        })
        .expect(201)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            const user = await User.findOne({
              email: testAccounts.extra.passwordChange.email
            });
            user.emailVerified = true;
            user.emailVerificationToken = undefined;
            user.emailVerificationTokenExpire = undefined;
            await user.save();
            done();
          } catch (err) {
            done(err);
          }
        });
    });
    it('should send user password reset token', done => {
      request(server)
        .post('/user/forgot-password')
        .send({
          email: testAccounts.extra.passwordChange.email
        })
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            const user = await User.findOne({
              email: testAccounts.extra.passwordChange.email
            });
            /**
             * Asign the tokens to a variable to use later in the tests.
             */
            passwordChange.passwordResetToken = user.passwordResetToken;
            passwordChange.passwordResetTokenExpire =
              user.passwordResetTokenExpire;
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
    it('should change user password with password reset token', done => {
      request(server)
        .post(`/user/reset-password/${passwordChange.passwordResetToken}`)
        .send({
          password: testAccounts.extra.passwordChange.password2,
          comfirmPassword: testAccounts.extra.passwordChange.password2
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
  });
});
