import { ListingCreatedEvent } from '@jjmauction/common';
import { v4 as uuidv4 } from 'uuid';

import { ListingCreatedListener } from '../../../src/events/listeners/listing-created-listener';
import { natsWrapper } from '../../../src/nats-wrapper';

const setup = () => {
  const listener = new ListingCreatedListener(natsWrapper.client);

  const data: ListingCreatedEvent['data'] = {
    id: uuidv4(),
    userId: uuidv4(),
    title: 'test title',
    slug: 'test-title',
    price: 100,
    expiresAt: new Date(),
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('acks the message', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
