const request = require('supertest');

const server = require('../index');

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
describe('👤 Account:', () => {
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
  });

  describe('📀 current user', () => {
    it('should return user account data', done => {
      request(server)
        .get('/account')
        .set('Authorization', `Bearer ${creds.user.token}`)
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
