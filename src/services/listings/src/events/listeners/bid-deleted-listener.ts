import {
  Listener,
  Subjects,
  BidDeletedEvent,
  NotFoundError,
} from '@jjmauction/common';
import { Message } from 'node-nats-streaming';
import { socketIOWrapper } from '../../socket-io-wrapper';
import { Listing, User } from '../../models';
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

    listing.set({ currentPrice: newPrice });

    await listing.save();

    await socketIOWrapper.io
      .of('/socket')
      .to(listing.slug)
      .emit('bid-deleted', listing);

    msg.ack();
  }
}
