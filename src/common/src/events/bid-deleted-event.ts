import { Subjects } from './subjects';

export interface BidDeletedEvent {
  subject: Subjects.BidDeleted;
  data: {
    id: string;
    newPrice: number;
  };
}
