import { Publisher, UserCreatedEvent, Subjects } from '@jjmauction/common';

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
}
