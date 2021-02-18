import { db, Bid } from '../src/models';

beforeAll(async () => {
  process.env.JWT_KEY = 'test';

  await db.authenticate();

  db.sync();
});

beforeEach(async () => {
  await Bid.destroy({
    where: {},
    truncate: true,
  });
});

afterAll(async () => {
  await db.close();
});
