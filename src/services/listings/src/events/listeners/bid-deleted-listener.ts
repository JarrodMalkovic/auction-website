import {
  BidDeletedEvent,
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

export class BidDeletedListener extends Listener<BidDeletedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.BidDeleted = Subjects.BidDeleted;

  async onMessage(data: BidDeletedEvent['data'], msg: Message) {
    const { id, newPrice } = data;

    const listing = await Listing.findOne({
      include: { model: User },
      where: { id },
    });

    if (!listing) {
      throw new NotFoundError();
    }

    await listing.update({ currentPrice: newPrice });

    new ListingUpdatedPublisher(natsWrapper.client).publish({
      id: listing.id,
      version: listing.version,
      status: listing.status,
      currentPrice: listing.currentPrice,
      currentWinnerId: listing.currentWinnerId,
    });

    await socketIOWrapper.io
      .of('/socket')
      .to(listing.slug)
      .emit('bid-deleted', listing);

    msg.ack();
  }
}
