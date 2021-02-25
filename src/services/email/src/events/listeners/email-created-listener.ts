import { EmailCreatedEvent, Listener, Subjects } from '@jjmauction/common';
import { Message } from 'node-nats-streaming';
import nodemailer from 'nodemailer';

import { queueGroupName } from './queue-group-name';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export class EmailCreatedListener extends Listener<EmailCreatedEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.EmailCreated = Subjects.EmailCreated;

  async onMessage(data: EmailCreatedEvent['data'], msg: Message) {
    const { email, subject, text } = data;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text,
    });

    msg.ack();
  }
}
