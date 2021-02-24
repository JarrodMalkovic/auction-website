import { Message } from 'node-nats-streaming';
import {
  Listener,
  Subjects,
  ListingUpdatedEvent,
  NotFoundError,
} from '@jjmauction/common';

import { Listing } from '../../models';
import { queueGroupName } from './queue-group-name';

export class ListingUpdatedListener extends Listener<ListingUpdatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.ListingUpdated = Subjects.ListingUpdated;

  async onMessage(data: ListingUpdatedEvent['data'], msg: Message) {
    const { id, status, currentPrice, currentWinnerId } = data;

    const listing = await Listing.findOne({ where: { id } });

    if (!listing) {
      throw new NotFoundError();
    }

    await listing.update({
      status,
      amount: currentPrice,
      winnerId: currentWinnerId,
    });

    msg.ack();
  }
}
