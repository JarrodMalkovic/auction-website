import { EmailCreatedEvent } from '@jjmauction/common';

import { EmailCreatedListener } from '../../../src/events/listeners/email-created-listener';
import { natsWrapper } from '../../../src/nats-wrapper';

const setup = () => {
  const listener = new EmailCreatedListener(natsWrapper.client);

  const data: EmailCreatedEvent['data'] = {
    email: 'test@gmail.com',
    subject: 'test',
    text: 'test',
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
