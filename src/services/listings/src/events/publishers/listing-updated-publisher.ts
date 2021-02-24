import { Publisher, ListingUpdatedEvent, Subjects } from '@jjmauction/common';

export class ListingUpdatedPublisher extends Publisher<ListingUpdatedEvent> {
  subject: Subjects.ListingUpdated = Subjects.ListingUpdated;
}
