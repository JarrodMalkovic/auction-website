import { Subjects } from './subjects';

export interface ListingDeletedEvent {
  subject: Subjects.ListingDeleted;
  data: {
    id: string;
    version: number;
  };
}
