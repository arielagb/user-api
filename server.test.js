const request = require('supertest');
const app = require('./server');

describe('User API', () => {

  // -------------------
  // GET /api/users
  // -------------------
  test('GET /api/users should return all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // -------------------
  // GET /api/users/:id
  // -------------------
  test('GET /api/users/:id should return a user', async () => {
    const response = await request(app).get('/api/users/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  test('GET /api/users/:id should return 404 for non-existent user', async () => {
    const response = await request(app).get('/api/users/999');
    expect(response.status).toBe(404);
  });

  test('GET /api/users/:id with invalid id should return 404', async () => {
    const response = await request(app).get('/api/users/abc');
    expect(response.status).toBe(404);
  });

  test('GET /api/users/:id with id=0 should return 404', async () => {
    const response = await request(app).get('/api/users/0');
    expect(response.status).toBe(404);
  });

  test('GET /api/users/:id with negative id should return 404', async () => {
    const response = await request(app).get('/api/users/-1');
    expect(response.status).toBe(404);
  });

  // -------------------
  // POST /api/users
  // -------------------
  test('POST /api/users should create new user', async () => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com' };
    const response = await request(app)
      .post('/api/users')
      .send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  test('POST /api/users should return 400 without email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Test' });
    expect(response.status).toBe(400);
  });

  test('POST /api/users should return 400 without name', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ email: 'test@test.com' });
    expect(response.status).toBe(400);
  });

  test('POST /api/users should return 400 with empty body', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({});
    expect(response.status).toBe(400);
  });

});