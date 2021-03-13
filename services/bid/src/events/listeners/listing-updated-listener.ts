import {
  Listener,
  ListingUpdatedEvent,
  NotFoundError,
  Subjects,
} from '@jjmauction/common';
import { Message } from 'node-nats-streaming';

import { Listing } from '../../models';
import { queueGroupName } from './queue-group-name';

export class ListingUpdatedListener extends Listener<ListingUpdatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.ListingUpdated = Subjects.ListingUpdated;

  async onMessage(data: ListingUpdatedEvent['data'], msg: Message) {
    const { id, status, currentPrice, version } = data;

    const listing = await Listing.findOne({
      where: { id, version: version - 1 },
    });

    if (!listing) {
      throw new NotFoundError();
    }

    await listing.update({ status, currentPrice });

    msg.ack();
  }
}
