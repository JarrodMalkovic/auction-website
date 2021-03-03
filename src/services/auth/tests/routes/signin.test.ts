import request from 'supertest';

import { app } from '../../src/app';
import { natsWrapper } from '../../src/nats-wrapper';

it('fails when a email does not exist is supplied', async () => {
  return request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@test.com', name: 'user', password: 'password' })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', name: 'user', password: 'password' });

  return request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@test.com', name: 'user', password: 'password1' })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', name: 'user', password: 'password' });

  const response = await request(app)
    .post('/api/auth/signin')
    .send({ email: 'test@test.com', name: 'user', password: 'password' })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
