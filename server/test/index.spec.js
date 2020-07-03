const request = require('supertest');
const app = require('../index');

describe('API Init Test', () => {
  it('Should be 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(404);
  });
});
