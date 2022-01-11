const request = require('supertest');
const app = require('../index');
const db = require('../models');

describe('User endpoints', () => {
  beforeAll(async () => {
    const Role = db.role;

    await db.sequelize.sync({ force: true });

    await Role.create({
      id: 1,
      name: 'user',
    });

    await Role.create({
      id: 2,
      name: 'admin',
    });

    await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'user',
        email: 'user@g',
        password: '123456',
        roles: ['user', 'admin'],
      });
  });

  it('should fetch users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('email', 'user@g');
  });

  it('should fetch single user', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'user@g');
  });

  it('should fetch not existing user', async () => {
    const res = await request(app).get('/api/users/99999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  it('should edit user', async () => {
    const res = await request(app)
      .put('/api/users/1')
      .send({
        username: 'new_username',
        email: 'new_username@g',
        roles: ['user', 'admin'],
        userId: 1,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'new_username');
  });

  it('should edit not existing user', async () => {
    const res = await request(app)
      .put('/api/users/99999')
      .send({
        username: 'new_username',
        email: 'new_username@g',
        roles: ['user', 'admin'],
        userId: 99999,
      });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  it('should delete user', async () => {
    const res = await request(app).delete('/api/users/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userId', '1');
  });

  it('should delete not existing user', async () => {
    const res = await request(app).delete('/api/users/99999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
