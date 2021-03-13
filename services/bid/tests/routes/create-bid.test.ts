import { ListingStatus } from '@jjmauction/common';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../../src/app';
import { Listing } from '../../src/models';
import { signup } from '../signup-helper';

const createListing = async (
  userId: string = uuidv4(),
  status: ListingStatus = ListingStatus.Active
) => {
  return await Listing.create({
    id: uuidv4(),
    status,
    userId: userId,
    expiresAt: new Date(),
    title: 'test',
    slug: 'test',
    startPrice: 100,
    currentPrice: 100,
  });
};

it('responds with a 401 if the user is not authenticated', async () => {
  const listing = await createListing();

  await request(app).post(`/api/bids/${listing.slug}`).expect(401);
});

it('responds with a 404 if there is no listing with the given slug', async () => {
  const { cookie } = signup();

  await request(app)
    .post('/api/bids/test')
    .set('Cookie', cookie)
    .send()
    .expect(404);
});

it('responds with a 400 if the bid amount is less than the current price', async () => {
  const { cookie } = signup();
  const listing = await createListing();

  await request(app)
    .post(`/api/bids/${listing.id}`)
    .set('Cookie', cookie)
    .send({ amount: 1 })
    .expect(400);
});

it('responds with a 400 if the auction has ended', async () => {
  const { cookie } = signup();
  const listing = await createListing(uuidv4(), ListingStatus.Expired);

  await request(app)
    .post(`/api/bids/${listing.id}`)
    .set('Cookie', cookie)
    .send({ amount: 1000 })
    .expect(400);
});

it('responds with with a 401 if a user atempts to bid on there own auction', async () => {
  const { cookie, id } = signup();
  const listing = await createListing(id);

  await request(app)
    .post(`/api/bids/${listing.id}`)
    .set('Cookie', cookie)
    .send({ amount: 1000 })
    .expect(400);
});
