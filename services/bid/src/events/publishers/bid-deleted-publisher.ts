import { BidDeletedEvent, Publisher, Subjects } from '@jjmauction/common';

export class BidDeletedPublisher extends Publisher<BidDeletedEvent> {
  subject: Subjects.BidDeleted = Subjects.BidDeleted;
}
