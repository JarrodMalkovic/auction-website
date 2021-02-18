import { Subjects } from './subjects';

export interface ListingExpiredEvent {
  subject: Subjects.ListingExpired;
  data: {
    id: string;
  };
}
