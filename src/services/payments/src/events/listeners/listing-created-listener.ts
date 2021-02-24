import { Message } from 'node-nats-streaming';
import { Listener, Subjects, ListingCreatedEvent } from '@jjmauction/common';

import { Listing } from '../../models';
import { queueGroupName } from './queue-group-name';

export class ListingCreatedListener extends Listener<ListingCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.ListingCreated = Subjects.ListingCreated;

  async onMessage(data: ListingCreatedEvent['data'], msg: Message) {
    const { id, price } = data;

    await Listing.create({
      id,
      winnerId: '',
      amount: price,
    });

    msg.ack();
  }
}
