import { Listener, Subjects, ListingDeletedEvent } from '@jjmauction/common';
import { Message } from 'node-nats-streaming';
import { Bid, Listing, db } from '../../models';

import { queueGroupName } from './queue-group-name';

export class ListingDeletedListener extends Listener<ListingDeletedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.ListingDeleted = Subjects.ListingDeleted;

  async onMessage(data: ListingDeletedEvent['data'], msg: Message) {
    await db.transaction(async (transaction) => {
      const { id } = data;

      await Listing.destroy({ where: { id }, transaction });
      await Bid.destroy({ where: { listingId: id }, transaction });

      msg.ack();
    });
  }
}
