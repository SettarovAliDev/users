const request = require('supertest');
// const app = require('../index');
const { app } = require('../index');

const db = require('../models');

describe('User signup endpoints', () => {
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
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'user',
        email: 'user@g',
        password: '123456',
        roles: ['user', 'admin'],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('jwt');
  });

  it('should register a new user with existing username', async () => {
    const user = {
      username: 'user',
      email: 'user@g',
      password: '123456',
      roles: ['user', 'admin'],
    };
    const res = await request(app).post('/api/auth/signup').send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      'message',
      `Username ${user.username} is already in use!`
    );
  });

  it('should register a new user with existing email', async () => {
    const user = {
      username: 'user2',
      email: 'user@g',
      password: '123456',
      roles: ['user', 'admin'],
    };
    const res = await request(app).post('/api/auth/signup').send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      'message',
      `Email ${user.email} is already in use!`
    );
  });

  it('should register with not exisiting roles', async () => {
    const user = {
      username: 'user2',
      email: 'user2@g',
      password: '123456',
      roles: ['user', 'admin', 'moderator'],
    };
    const res = await request(app).post('/api/auth/signup').send(user);
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      'message',
      `Role ${user.roles[2]} does not exist`
    );
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
