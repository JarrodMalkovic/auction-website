import { Message } from 'node-nats-streaming';
import {
  Listener,
  ListingStatus,
  Subjects,
  ListingCreatedEvent,
} from '@jjmauction/common';

import { Listing } from '../../models';
import { queueGroupName } from './queue-group-name';

export class ListingCreatedListener extends Listener<ListingCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.ListingCreated = Subjects.ListingCreated;

  async onMessage(data: ListingCreatedEvent['data'], msg: Message) {
    const { id, userId, title, slug, expiresAt, price } = data;

    await Listing.create({
      id,
      title,
      slug,
      userId,
      status: ListingStatus.Active,
      expiresAt,
      startPrice: price,
      currentPrice: price,
    });

    msg.ack();
  }
}
