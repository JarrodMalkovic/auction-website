import { ListingDeletedEvent, Publisher, Subjects } from '@jjmauction/common';

export class ListingDeletedPublisher extends Publisher<ListingDeletedEvent> {
  subject: Subjects.ListingDeleted = Subjects.ListingDeleted;
}
