import { Listener, Subjects, UserCreatedEvent } from '@jjmauction/common';
import { Message } from 'node-nats-streaming';
import { Profile } from '../../models';

import { queueGroupName } from './queue-group-name';

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.UserCreated = Subjects.UserCreated;

  async onMessage(data: UserCreatedEvent['data'], msg: Message) {
    const { id } = data;

    await Profile.create({
      userId: id,
      firstName: '',
      lastName: '',
      country: '',
      about: '',
    });

    msg.ack();
  }
}
