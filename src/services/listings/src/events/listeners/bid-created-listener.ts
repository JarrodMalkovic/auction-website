import {
  Listener,
  Subjects,
  BidCreatedEvent,
  NotFoundError,
} from '@jjmauction/common';
import { Message } from 'node-nats-streaming';
import { socketIOWrapper } from '../../socket-io-wrapper';

import { Listing, User } from '../../models';
import { queueGroupName } from './queue-group-name';

export class BidCreatedListener extends Listener<BidCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.BidCreated = Subjects.BidCreated;

  async onMessage(data: BidCreatedEvent['data'], msg: Message) {
    const { listingId, amount } = data;

    const listing = await Listing.findOne({
      include: { model: User },
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundError();
    }

    listing.set({ currentPrice: amount });

    await listing.save();

    await socketIOWrapper.io
      .of('/socket')
      .to(listing.slug)
      .emit('bid', listing);

    msg.ack();
  }
}
