import { Subjects } from './subjects';

export interface UserCreatedEvent {
  subject: Subjects.UserCreated;
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}
