import request from 'supertest';

import { app } from '../../src/app';
import { Profile, db } from '../../src/models';
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
  await request(app).patch('/api/profile').expect(401);
});

it('responds with a 404 if the user has no profile', async () => {
  const { cookie } = signup();

  await request(app)
    .patch('/api/profile')
    .set('Cookie', cookie)
    .send({
      about: 'I am a student',
      firstName: 'John',
      lastName: 'Malkovic',
      country: 'Australia',
    })
    .expect(404);
});

it('responds with a 400 if missing properties', async () => {
  const { cookie, id } = signup();
  await createProfile(id);

  await request(app).patch('/api/profile').set('Cookie', cookie).expect(400);
});

it('responds with a 200 if profile is updated correctly', async () => {
  const { cookie, id } = signup();
  await createProfile(id);

  await request(app)
    .patch('/api/profile')
    .set('Cookie', cookie)
    .send({
      about: 'I am a student',
      firstName: 'John',
      lastName: 'Malkovic',
      country: 'Australia',
    })
    .expect(200);
});

it('correctly updates the profile fields ', async () => {
  const { cookie, id } = signup();
  await createProfile(id);

  const response = await request(app)
    .patch('/api/profile')
    .set('Cookie', cookie)
    .send({
      about: 'I am a student',
      firstName: 'John',
      lastName: 'Malkovic',
      country: 'Australia',
    });

  expect(response.body.firstName).toEqual('John');
});
