import { db } from './models';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { UserCreatedListener } from './events/listeners/user-created-listener';

(async () => {
  try {
    console.log('The profile service has started');

    if (!process.env.PROFILE_MYSQL_URI) {
      throw new Error('PROFILE_MYSQL_URI must be defined');
    }

    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
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

    await db.authenticate();
    await db.sync();
    console.log('Conneted to MySQL');

    app.listen(3000, () => console.log('Listening on port 3000!'));

    new UserCreatedListener(natsWrapper.client).listen();

    console.log('The profile service has started up successfully');
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
})();
