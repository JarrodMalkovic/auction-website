import { ListingUpdatedEvent, Publisher, Subjects } from '@jjmauction/common';

export class ListingUpdatedPublisher extends Publisher<ListingUpdatedEvent> {
  subject: Subjects.ListingUpdated = Subjects.ListingUpdated;
}
