const request = require('supertest');

const server = require('../index');

describe('⏳ loading express', () => {
  it('responds to /', done => {
    request(server)
      .get('/')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it('404 everything else', done => {
    request(server)
      .get('/foo/bar')
      .expect(404)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
