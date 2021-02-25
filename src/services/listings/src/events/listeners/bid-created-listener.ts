import {
  BidCreatedEvent,
  Listener,
  NotFoundError,
  Subjects,
} from '@jjmauction/common';
import { Message } from 'node-nats-streaming';

import { Listing, User } from '../../models';
import { natsWrapper } from '../../nats-wrapper';
import { socketIOWrapper } from '../../socket-io-wrapper';
import { ListingUpdatedPublisher } from '../publishers/listing-updated-publisher';
import { queueGroupName } from './queue-group-name';

export class BidCreatedListener extends Listener<BidCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.BidCreated = Subjects.BidCreated;

  async onMessage(data: BidCreatedEvent['data'], msg: Message) {
    const { listingId, amount, userId } = data;

    const listing = await Listing.findOne({
      include: { model: User },
      where: { id: listingId },
    });

    if (!listing) {
      throw new NotFoundError();
    }

    // Check we are not processing events out of order
    if (amount < listing.currentPrice) {
      return msg.ack();
    }

    await listing.update({ currentPrice: amount, currentWinnerId: userId });

    new ListingUpdatedPublisher(natsWrapper.client).publish({
      id: listingId,
      status: listing.status,
      currentPrice: listing.currentPrice,
      currentWinnerId: listing.currentWinnerId,
      version: listing.version,
    });

    await socketIOWrapper.io
      .of('/socket')
      .to(listing.slug)
      .emit('bid', listing);

    msg.ack();
  }
}
