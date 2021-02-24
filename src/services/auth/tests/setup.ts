import { db, User } from '../src/models';

beforeAll(async () => {
  process.env.JWT_KEY = 'test';

  await db.authenticate();

  db.sync();
});

beforeEach(async () => {
  await User.destroy({
    where: {},
    truncate: true,
  });
});

afterAll(async () => {
  await db.close();
});
