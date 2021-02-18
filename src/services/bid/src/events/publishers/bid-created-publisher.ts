import { Publisher, BidCreatedEvent, Subjects } from '@jjmauction/common';

export class BidCreatedPublisher extends Publisher<BidCreatedEvent> {
  subject: Subjects.BidCreated = Subjects.BidCreated;
}
