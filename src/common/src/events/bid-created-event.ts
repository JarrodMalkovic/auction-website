import { Subjects } from './subjects';

export interface BidCreatedEvent {
  subject: Subjects.BidCreated;
  data: {
    listingId: string;
    userId: string;
    amount: number;
  };
}
