import { Subjects } from './subjects';

export interface EmailCreatedEvent {
  subject: Subjects.EmailCreated;
  data: {
    email: string;
    subject: string;
    text: string;
    version: number;
  };
}
