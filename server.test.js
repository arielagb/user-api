const request = require('supertest');
const app = require('./server');

describe('User API', () => {

  test('GET /api/users should return all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /api/users/:id should return user', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  test('GET /api/users/:id should return 404', async () => {
    const response = await request(app).get('/api/users/999');
    expect(response.status).toBe(404);
  });

  test('POST /api/users should create new user', async () => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com' };
    const response = await request(app)
      .post('/api/users')
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
  });

  test('POST /api/users should return 400 without email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test' });
    expect(response.status).toBe(400);
  });

});