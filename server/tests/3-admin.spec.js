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
describe('👮‍♂️ Admin:', () => {
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
  });
  describe('👥 users', () => {
    it('should return users data', done => {
      request(server)
        .get('/admin/users')
        .set('Authorization', `Bearer ${creds.admin.token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }
          try {
            done();
          } catch (err) {
            return done(err);
          }
        });
    });
  });
});
