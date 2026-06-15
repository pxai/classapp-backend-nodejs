const request = require('supertest');
const app = require('../../src/server');

describe('GET /domains', () => {
  it('returns seeded domains', async () => {
    const response = await request(app).get('/domains');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0]).toMatchObject({
      name: 'classapp.org',
      description: 'Main Classapp domain',
    });
  });
});

describe('GET /domains/:id', () => {
  it('returns a domain by id', async () => {
    const response = await request(app).get('/domains/1');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: 1,
      name: 'classapp.org',
    });
  });

  it('returns an empty object when the domain does not exist', async () => {
    const response = await request(app).get('/domains/999');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
