import { Publisher, Subjects, UserCreatedEvent } from '@jjmauction/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
