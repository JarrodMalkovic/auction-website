import { Subjects, Publisher, PaymentCreatedEvent } from '@jjmauction/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
