const request = require('supertest');
// const app = require('../index');
const { app } = require('../index');

const db = require('../models');

describe('Profile endpoints', () => {
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

  it('should add profile', async () => {
    const res = await request(app).post('/api/profiles').send({
      name: 'Settarov Ali',
      gender: 'male',
      birthdate: '1997-07-10',
      city: 'Kyiv',
      userId: 1,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  it('should add profile for not existing user', async () => {
    const res = await request(app).post('/api/profiles').send({
      name: 'Settarov Ali',
      gender: 'male',
      birthdate: '1997-07-10',
      city: 'Kyiv',
      userId: 99999,
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  it('should edit profile', async () => {
    const res = await request(app).put('/api/profiles/1').send({
      name: 'Sarah Davies',
      gender: 'female',
      birthdate: '1998-08-11',
      city: 'New York',
      profileId: 1,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('userId', 1);
  });

  it('should edit not existing profile', async () => {
    const res = await request(app).put('/api/profiles/99999').send({
      name: 'Sarah Davies',
      gender: 'female',
      birthdate: '1998-08-11',
      city: 'New York',
      profileId: 99999,
    });
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  it('should delete profile', async () => {
    const res = await request(app).delete('/api/profiles/99999');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
  });

  it('should delete profile', async () => {
    const res = await request(app).delete('/api/profiles/1');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('profileId', '1');
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
