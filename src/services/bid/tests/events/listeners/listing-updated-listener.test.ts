import { ListingStatus, ListingUpdatedEvent } from '@jjmauction/common';
import { v4 as uuidv4 } from 'uuid';

import { ListingUpdatedListener } from '../../../src/events/listeners/listing-updated-listener';
import { Listing } from '../../../src/models';
import { natsWrapper } from '../../../src/nats-wrapper';

const setup = async () => {
  const listener = new ListingUpdatedListener(natsWrapper.client);

  const listing = await Listing.create({
    id: uuidv4(),
    userId: uuidv4(),
    status: ListingStatus.Active,
    startPrice: 1000,
    currentPrice: 1000,
    title: 'test',
    slug: 'test',
    expiresAt: new Date(),
  });

  const data: ListingUpdatedEvent['data'] = {
    id: listing.id,
    status: ListingStatus.Complete,
    currentPrice: 1000,
    currentWinnerId: '',
    version: 1,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('updates a listing', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const listing = await Listing.findOne({ where: { id: data.id } });

  expect(listing!.status).toEqual(ListingStatus.Complete);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
