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
import { ListingUpdatedPublisher } from '../publishers/listing-updated-publisher';
import { natsWrapper } from '../../nats-wrapper';

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

    listing.set({ currentPrice: amount, currentWinnerId: userId });

    await listing.save();

    new ListingUpdatedPublisher(natsWrapper.client).publish({
      id: listingId,
      status: listing.status,
      currentPrice: listing.currentPrice,
      currentWinnerId: listing.currentWinnerId,
    });

    await socketIOWrapper.io
      .of('/socket')
      .to(listing.slug)
      .emit('bid', listing);

    msg.ack();
  }
}
