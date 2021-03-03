import { Bid, Listing, User, db } from '../src/models';

jest.mock('../src/nats-wrapper.ts');

beforeAll(async () => {
  process.env.JWT_KEY = 'test';

  await db.authenticate();
  await db.sync();
});

beforeEach(async () => {
  await Promise.all([
    Bid.destroy({
      where: {},
      truncate: true,
    }),
    Listing.destroy({
      where: {},
      truncate: true,
    }),
    User.destroy({
      where: {},
      truncate: true,
    }),
  ]);
});

afterAll(async () => {
  await db.close();
});
