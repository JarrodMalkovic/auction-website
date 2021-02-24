import { EmailCreatedListener } from './events/listeners/email-created-listener';
import { natsWrapper } from './nats-wrapper';

(async () => {
  try {
    console.log('The profile service has started');

    if (!process.env.EMAIL) {
      throw new Error('EMAIL must be defined');
    }

    if (!process.env.EMAIL_PASSWORD) {
      throw new Error('EMAIL_PASSWORD must be defined');
    }

    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
    }

    if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    await new EmailCreatedListener(natsWrapper.client).listen();

    console.log('The email service has started up successfully');
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
})();
