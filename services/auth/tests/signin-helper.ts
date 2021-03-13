import request from 'supertest';

import { app } from '../src/app';
import { natsWrapper } from '../src/nats-wrapper';

const signup = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const name = 'jarrod';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password, name });

  const cookie = response.get('Set-Cookie');

  return cookie;
};

export { signup };
