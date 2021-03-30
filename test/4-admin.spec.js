/* eslint-disable no-undef */
const supertest = require('supertest');
const app = require('../src/index');

let adminCookie = null;
let ownerCookie = null;

describe('LOGGED IN (admin)', () => {
  describe('LOGIN as admin.', () => {
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

  describe('GET /admin', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/admin/')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET /admin/uploads', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/admin/uploads/')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('/admin/uploads-data (This is used for the / route for manging the upload list) (asc)', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/admin/uploads-data?order=asc&offset=0&limit=10')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /admin/uploads-data (This is used for the / route for manging the upload list) (desc)', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/admin/uploads-data?order=desc&offset=0&limit=10')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });
  });

  describe('GET /admin/gallery', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/admin/gallery')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET /admin/users', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/admin/users')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET /admin/users/slug', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/admin/users/usermrdemonwolfgithubio')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('GET /admin/users/edit/slug', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .get('/admin/users/edit/usermrdemonwolfgithubio')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /admin/users/edit/slug', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .put('/admin/users/edit/usermrdemonwolfgithubio')
        .set('Cookie', adminCookie)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          username: 'aexampleuser',
          email: 'user@mrdemonwolf.github.io',
          role: 'user'
        })
        .expect(302)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /admin/users/edit/slug/streamer-mode/true (Enable)', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .put('/admin/users/edit/usermrdemonwolfgithubio/streamer-mode/true')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /admin/users/edit/slug/streamer-mode/false (Disable)', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .put('/admin/users/edit/usermrdemonwolfgithubio/streamer-mode/false')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /admin/users/ban/slug', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .put('/admin/users/ban/bannedmrdemonwolfgithubio')
        .set('Cookie', adminCookie)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });
  describe('PUT /admin/users/suspend/slug', () => {
    it('it should has status code 200', done => {
      supertest(app)
        .put('/admin/users/suspend/suspendedmrdemonwolfgithubio')
        .set('Cookie', adminCookie)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send({
          reason:
            'For breaking the rules you have been issued a suspension from our site.',
          expire: 1
        })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('LOGIN as owner.', () => {
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
});
