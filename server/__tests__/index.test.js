process.env = { NODE_ENV: 'production' };
const request = require('supertest');
const { app, server } = require('../index');

describe('Index.js test', () => {
  it('should test index.js in production environment', async () => {
    await request(app).get('/');
  });

  afterAll(async () => {
    await server.close();
  });
});
