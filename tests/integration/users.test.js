const request = require('supertest');
const app = require('../../src/server');

describe('GET /users', () => {
  it('returns seeded users', async () => {
    const response = await request(app).get('/users');
// INSERT INTO users (email, password, description) VALUES ('admin@example.com', 'password', 'Admin user');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(4);
    expect(response.body[0]).toMatchObject({
      email: 'admin@example.com',
      password: 'password',
      description: 'Admin user',
    });
  });
});

describe('GET /users/:id', () => {
  it('returns a user by id', async () => {
    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      email: 'admin@example.com',
      password: 'password',
      description: 'Admin user',
    });
  });

  it('returns an empty object when the user does not exist', async () => {
    const response = await request(app).get('/users/999');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
