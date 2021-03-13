import { UserCreatedEvent } from '@jjmauction/common';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '../../../src/app';
import { UserCreatedListener } from '../../../src/events/listeners/user-created-listener';
import { User } from '../../../src/models';
import { natsWrapper } from '../../../src/nats-wrapper';

const setup = () => {
  const listener = new UserCreatedListener(natsWrapper.client);

  const data: UserCreatedEvent['data'] = {
    id: uuidv4(),
    name: 'Jarrod',
    email: 'test@gmail.com',
    avatar: 'test.png',
    version: 0,
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates a user in the listings database when a new user is created', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  const user = await User.findOne({ where: { id: data.id } });

  expect(user).toBeDefined();
});

it('acks the message', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
