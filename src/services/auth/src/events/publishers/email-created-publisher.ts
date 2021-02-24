import { Publisher, EmailCreatedEvent, Subjects } from '@jjmauction/common';

export class EmailCreatedPublisher extends Publisher<EmailCreatedEvent> {
  subject: Subjects.EmailCreated = Subjects.EmailCreated;
}
