import { ListingStatus } from '@jjmauction/common';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../../src/app';
import { Listing } from '../../src/models';
import { signup } from '../signup';

const createListing = async (
  winnerId: string = uuidv4(),
  status: ListingStatus = ListingStatus.AwaitingPayment
) => {
  return await Listing.create({
    id: uuidv4(),
    amount: 100,
    winnerId,
    status,
  });
};

it('responds with a 401 if the user is not authenticated', async () => {
  await request(app).post('/api/payments').expect(401);
});

it('responds with a 400 if the user trys to pay for an auction they did not win', async () => {
  const { cookie } = signup();
  const listing = await createListing();

  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({ listingId: listing.id, token: process.env.STRIPE_KEY })
    .expect(400);
});

it('responds with a 400 if the user trys to pay for an a listing they have already paid for', async () => {
  const { cookie } = signup();
  const listing = await createListing(uuidv4(), ListingStatus.Complete);

  await request(app)
    .post('/api/payments')
    .set('Cookie', cookie)
    .send({ listingId: listing.id, token: process.env.STRIPE_KEY })
    .expect(400);
});
