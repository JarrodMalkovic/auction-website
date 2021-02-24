import {
  Listener,
  Subjects,
  ListingExpiredEvent,
  NotFoundError,
  ListingStatus,
} from '@jjmauction/common';

import { Message } from 'node-nats-streaming';
import { Listing } from '../../models';
import { natsWrapper } from '../../nats-wrapper';
import { ListingUpdatedPublisher } from '../publishers/listing-updated-publisher';
import { queueGroupName } from './queue-group-name';

export class ListingExpiredListener extends Listener<ListingExpiredEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.ListingExpired = Subjects.ListingExpired;

  async onMessage(data: ListingExpiredEvent['data'], msg: Message) {
    const { id } = data;
    const listing = await Listing.findOne({ where: { id } });

    if (!listing) {
      throw new NotFoundError();
    }

    const newStatus =
      listing.startPrice === listing.currentPrice
        ? ListingStatus.Expired
        : ListingStatus.AwaitingPayment;

    await listing.update({ status: newStatus });

    new ListingUpdatedPublisher(natsWrapper.client).publish({
      id: listing.id,
      status: listing.status,
      currentPrice: listing.currentPrice,
      currentWinnerId: listing.currentWinnerId,
    });

    msg.ack();
  }
}
