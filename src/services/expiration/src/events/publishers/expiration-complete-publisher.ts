import { ListingExpiredEvent, Publisher, Subjects } from '@jjmauction/common';

export class ExpirationCompletePublisher extends Publisher<ListingExpiredEvent> {
  subject: Subjects.ListingExpired = Subjects.ListingExpired;
}
