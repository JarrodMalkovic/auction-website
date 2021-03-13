import request from 'supertest';

import { app } from '../../src/app';
import { Profile } from '../../src/models';
import { signup } from '../signup-helper';

const createProfile = async (id) => {
  return await Profile.create({
    userId: id,
    about: '',
    firstName: 'Jarrod',
    lastName: 'Malkovic',
    country: 'Australia',
  });
};

it('responds with a 401 if the user is not authenticated', async () => {
  await request(app).get('/api/profile').expect(401);
});

it('reponds with a users profile if it exists', async () => {
  const { cookie, id } = signup();
  await createProfile(id);

  const response = await request(app)
    .get('/api/profile')
    .set('Cookie', cookie)
    .send();

  expect(response).toBeDefined();
});

it('responds with the correct details of a users profile if it exists', async () => {
  const { cookie, id } = signup();
  await createProfile(id);

  const response = await request(app)
    .get('/api/profile')
    .set('Cookie', cookie)
    .send();

  expect(response.body.firstName).toEqual('Jarrod');
});
