const request = require('supertest');
// const app = require('../index');
const { app } = require('../index');

const db = require('../models');

describe('User signin endpoints', () => {
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

  it('should signin user by password', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: 'user@g',
      password: '123456',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('jwt');
  });

  it('should signin user with wrong email', async () => {
    const reqBody = {
      email: 'wrong@g',
      password: '123456',
    };
    const res = await request(app).post('/api/auth/signin').send(reqBody);
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toContain(`User ${reqBody.email} not found`);
  });

  it('should signin user with wrong password', async () => {
    const res = await request(app).post('/api/auth/signin').send({
      email: 'user@g',
      password: 'invalid',
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toContain('Invalid password');
  });

  it('should signin user with token', async () => {
    const resData = {
      userId: 1,
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxODIyNTcyLCJleHAiOjE2NDQ1MDA5NzJ9.2dFtxAae_FKLEOL5aaxBV_v9cBZ-QEMVpHBi3m6raRQ',
      isAdmin: true,
    };
    const res = await request(app)
      .get('/api/auth/login')
      .set('x-access-token', resData.jwt)
      .send(resData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userId', resData.userId);
  });

  it('should signin user with wrong token', async () => {
    const res = await request(app)
      .get('/api/auth/login')
      .set('x-access-token', 'wrong_jwt');
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized!');
  });

  it('should signin user without token', async () => {
    const res = await request(app).get('/api/auth/login');
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('message', 'No token provided!');
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
