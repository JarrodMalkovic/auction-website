import { Profile, db } from '../src/models';

jest.mock('../src/nats-wrapper');

beforeAll(async () => {
  process.env.JWT_KEY = 'test';

  await db.authenticate();
  await db.sync();
});

beforeEach(async () => {
  jest.clearAllMocks();

  await Profile.destroy({
    where: {},
    truncate: true,
  });
});

afterAll(async () => {
  await db.close();
});
