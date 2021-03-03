import { Listing, Payment, db } from '../src/models';

jest.mock('../src/nats-wrapper');

beforeAll(async () => {
  process.env.JWT_KEY = 'test';
  process.env.STRIPE_KEY =
    'pk_test_51I7NJ5LQOU4SKz9IV9bdjUwPlGAb9UDKlwjKLxdmu52uQpPHfKn6KvpBIpEIIbI1XISEaFRmIpHgnpIGVFlwmKu300buDGjcwL';

  await db.authenticate();
  await db.sync();
});

beforeEach(async () => {
  jest.clearAllMocks();

  await Listing.destroy({
    where: {},
    truncate: true,
  });

  await Payment.destroy({
    where: {},
    truncate: true,
  });
});

afterAll(async () => {
  await db.close();
});
