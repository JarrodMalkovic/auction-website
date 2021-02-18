import request from 'supertest';
import { app } from '../../src/app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', name: 'user', password: 'password' })
    .expect(201);

  const response = await request(app).post('/api/users/signout').send({});

  expect(response.get('Set-Cookie')).toBeDefined();
});
