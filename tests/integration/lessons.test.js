const request = require('supertest');
const app = require('../../src/server');

describe('GET /lessons', () => {
  it('returns seeded lessons', async () => {
    const response = await request(app).get('/lessons');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(6);
    expect(response.body[0]).toMatchObject({
      name: 'Intro to Node',
      description: 'What Node.js is',
    });
  });
});

describe('GET /lessons/:id', () => {
  it('returns a lesson by id', async () => {
    const response = await request(app).get('/lessons/1');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      name: 'Intro to Node',
    });
  });

  it('returns an empty object when the lesson does not exist', async () => {
    const response = await request(app).get('/lessons/999');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
