import { Listener, Subjects, UserCreatedEvent } from '@jjmauction/common';
import { Message } from 'node-nats-streaming';
import { User } from '../../models';

import { queueGroupName } from './queue-group-name';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.UserCreated = Subjects.UserCreated;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id, name } = data;

    await User.create({ id, name });

    msg.ack();
  }
}
