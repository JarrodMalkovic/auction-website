import { UserCreatedEvent } from '@jjmauction/common';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../../../src/app';
import { UserCreatedListener } from '../../../src/events/listeners/user-created-listener';
import { Profile } from '../../../src/models';
import { natsWrapper } from '../../../src/nats-wrapper';

const setup = () => {
  const listener = new UserCreatedListener(natsWrapper.client);

  const data: UserCreatedEvent['data'] = {
    id: uuidv4(),
    name: 'Jarrod',
    email: 'test@gmail.com',
    avatar: 'test.png',
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates a profile for the newly created user', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  const profile = await Profile.findOne({ where: { userId: data.id } });

  expect(profile).toBeDefined();
});

it('acks the message', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
