import { app } from './app';
import { db } from './models';
import { natsWrapper } from './nats-wrapper';

(async () => {
  try {
    console.log('The auth service has started');

    if (!process.env.NATS_URL) {
      throw new Error('NATS_URL must be defined');
    }

    if (!process.env.NATS_CLIENT_ID) {
      throw new Error('NATS_CLIENT_ID must be defined');
    }

    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }

    if (!process.env.AUTH_MYSQL_URI) {
      throw new Error('AUTH_MYSQL_URI must be defined');
    }

    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be defined');
    }

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    await db.authenticate();
    db.sync();
    console.log('Conneted to MySQL');

    await app.listen(3000);
    console.log('Listening on port 3000!');

    console.log('The auth service has started up successfully');
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
})();
