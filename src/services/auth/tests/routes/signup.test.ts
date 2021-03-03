import request from 'supertest';

import { app } from '../../src/app';
import { natsWrapper } from '../../src/nats-wrapper';

it('returns a 201 on a successful signup', async () => {
  const res = await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', name: 'user', password: 'password' })
    .expect(201);

  console.log(res);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/auth/signup')
    .send({ email: 'test.com', name: 'user', password: 'password' })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', name: 'user', password: '123' })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  return request(app).post('/api/auth/signup').send({}).expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app).post('/api/auth/signup').send({
    email: 'test@test.com',
    name: 'user1',
    password: 'password',
  });

  return request(app)
    .post('/api/auth/signup')
    .send({
      email: 'test@test.com',
      name: 'user2',
      password: 'password',
    })
    .expect(400);
});

it('sets a cookie after succesful signup', async () => {
  const response = await request(app).post('/api/auth/signup').send({
    email: 'test@test.com',
    name: 'user',
    password: 'password',
  });

  expect(response.get('Set-Cookie')).toBeDefined();
});
