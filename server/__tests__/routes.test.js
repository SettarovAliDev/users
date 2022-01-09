const request = require('supertest');
const app = require('../index');

// DATABASE
const db = require('../models');
const Role = db.role;

// DELETE TABLES AND CREATE NEW
db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  });

  Role.create({
    id: 2,
    name: 'admin',
  });
}

describe('User register endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'user',
        email: 'user@g',
        password: '123456',
        roles: ['user', 'admin'],
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('jwt');
  });
  // it('should register a new user with existing username', async () => {
  //   const user = {
  //     username: 'user',
  //     email: 'user@g',
  //     password: '123456',
  //     roles: ['user', 'admin'],
  //   };
  //   const res = await request(app).post('/api/auth/signup').send(user);
  //   expect(res.statusCode).toEqual(400);
  //   expect(res.body.message).toContain(
  //     `Username ${user.username} is already in use`
  //   );
  // });
  // it('should register a new user with existing email', async () => {
  //   const user = {
  //     username: 'user',
  //     email: 'user@g',
  //     password: '123456',
  //     roles: ['user', 'admin'],
  //   };
  //   const res = await request(app).post('/api/auth/signup').send(user);
  //   expect(res.statusCode).toEqual(400);
  //   expect(res.body.message).toContain(`Email ${user.email} is already in use`);
  // });
});
