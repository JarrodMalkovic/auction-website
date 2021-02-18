import request from 'supertest';
import { app } from '../../src/app';
import { signup } from '../signin-helper';

it('reponds with details about the current user', async () => {
  const cookie = await signup();

  const response = await request(app)
    .get('/api/users/current-user')
    .set('Cookie', cookie)
    .send();

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('it responds with null if the current user is not authenticated', async () => {
  const response = await request(app).get('/api/users/current-user').send();

  expect(response.body.currentUser).toEqual(null);
});
