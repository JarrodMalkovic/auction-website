import request from 'supertest';

import { app } from '../../src/app';
import { natsWrapper } from '../../src/nats-wrapper';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/auth/signup')
    .send({ email: 'test@test.com', name: 'user', password: 'password' })
    .expect(201);

  const response = await request(app).post('/api/auth/signout').send({});

  expect(response.get('Set-Cookie')).toBeDefined();
});
