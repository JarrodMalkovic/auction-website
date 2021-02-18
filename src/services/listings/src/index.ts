import cloudinary from 'cloudinary';
import { socketIOWrapper } from './socket-io-wrapper';
import { db } from './models';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { BidCreatedListener } from './events/listeners/bid-created-listener';
import { BidDeletedListener } from './events/listeners/bid-deleted-listener';
import { UserCreatedListener } from './events/listeners/user-created-listener';

(async () => {
  try {
    console.log('The listings service has started');

    if (!process.env.LISTINGS_MYSQL_URI) {
      throw new Error('LISTINGS_MYSQL_URI must be defined');
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

    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }

    if (!process.env.CLOUDINARY_API_KEY) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }

    if (!process.env.CLOUDINARY_API_SECRET) {
      throw new Error('NATS_CLUSTER_ID must be defined');
    }

    /// @ts-ignore
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

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

    const server = app.listen(3000, () =>
      console.log('Listening on port 3000!')
    );

    socketIOWrapper.listen(server);

    socketIOWrapper.io.of('/socket').on('connection', (socket) => {
      const room = socket.handshake['query']['r_var'];

      socket.on('join', () => {
        socket.join(room);
        console.log('[socket]', 'join room :', room);
      });

      socket.on('unsubscribe', (room) => {
        try {
          console.log('[socket]', 'leaving room :', room);
          socket.leave(room);
          console.log('[socket]', 'left room :', room);
        } catch (e) {
          console.log('[error]', 'leave room :', e);
        }
      });

      socket.on('disconnect', (reason) => {
        console.log('[socket]', 'disconected :', reason);
      });
    });

    new BidCreatedListener(natsWrapper.client).listen();
    new BidDeletedListener(natsWrapper.client).listen();
    new UserCreatedListener(natsWrapper.client).listen();

    console.log('The listings service has started up successfully');
  } catch (err) {
    console.error(err);
    process.exit(0);
  }
})();
