const request = require('supertest');
const app = require('../../src/server');

describe('GET /courses', () => {
  it('returns seeded courses', async () => {
    const response = await request(app).get('/courses');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toMatchObject({
      name: 'Node.js Basics',
      description: 'Introduction to Node.js',
    });
  });
});

describe('GET /courses/:id', () => {
  it('returns a course by id', async () => {
    const response = await request(app).get('/courses/1');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      name: 'Node.js Basics',
    });
  });

  it('returns an empty object when the course does not exist', async () => {
    const response = await request(app).get('/courses/999');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
