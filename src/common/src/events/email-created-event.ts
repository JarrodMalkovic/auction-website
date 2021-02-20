import { Subjects } from './subjects';

export interface EmailCreatedEvent {
  subject: Subjects.EmailCreated;
  data: {
    userId: string;
  };
}
