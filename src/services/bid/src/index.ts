import { app } from './app';
import { ListingCreatedListener } from './events/listeners/listing-created-listener';
import { ListingDeletedListener } from './events/listeners/listing-deleted-listener';
import { ListingUpdatedListener } from './events/listeners/listing-updated-listener';
import { UserCreatedListener } from './events/listeners/user-created-listener';
import { db } from './models';
import { natsWrapper } from './nats-wrapper';

(async () => {
  try {
    console.log('The bid service has started');

    if (!process.env.BID_MYSQL_URI) {
      throw new Error('BID_MYSQL_URI must be defined');
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
    await db.sync({ force: true });
    console.log('Conneted to MySQL');

    app.listen(3000, () => console.log('Listening on port 3000!'));

    new ListingCreatedListener(natsWrapper.client).listen();
    new ListingDeletedListener(natsWrapper.client).listen();
    new ListingUpdatedListener(natsWrapper.client).listen();
    new UserCreatedListener(natsWrapper.client).listen();

    console.log('The auth service has started up successfully');
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
})();
