const request = require('supertest');
const app = require('../src/server');

describe('GET /', () => {
  it('responds with Hello World', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World');
  });
});
