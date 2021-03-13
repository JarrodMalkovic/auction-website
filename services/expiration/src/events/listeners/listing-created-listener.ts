import { Listener, ListingCreatedEvent, Subjects } from '@jjmauction/common';
import { Message } from 'node-nats-streaming';

import { expirationQueue } from '../../queues/expiration-queue';
import { queueGroupName } from './queue-group-name';

export class ListingCreatedListener extends Listener<ListingCreatedEvent> {
  subject: Subjects.ListingCreated = Subjects.ListingCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ListingCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add(
      {
        id: data.id,
      },
      { delay }
    );

    msg.ack();
  }
}
