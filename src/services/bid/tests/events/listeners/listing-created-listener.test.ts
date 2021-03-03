import { ListingCreatedEvent } from '@jjmauction/common';
import { v4 as uuidv4 } from 'uuid';

import { ListingCreatedListener } from '../../../src/events/listeners/listing-created-listener';
import { Listing } from '../../../src/models';
import { natsWrapper } from '../../../src/nats-wrapper';

const setup = () => {
  const listener = new ListingCreatedListener(natsWrapper.client);

  const data: ListingCreatedEvent['data'] = {
    id: uuidv4(),
    userId: uuidv4(),
    title: 'test',
    slug: 'test',
    expiresAt: new Date(),
    price: 1000,
    version: 0,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates a listing', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  const profile = await Listing.findOne({ where: { id: data.id } });

  expect(profile).toBeDefined();
});

it('acks the message', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
