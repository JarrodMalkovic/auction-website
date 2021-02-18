import { Subjects } from './subjects';

export interface ListingCreatedEvent {
  subject: Subjects.ListingCreated;
  data: {
    id: string;
    userId: string;
    title: string;
    slug: string;
    price: number;
    expiresAt: Date;
  };
}
