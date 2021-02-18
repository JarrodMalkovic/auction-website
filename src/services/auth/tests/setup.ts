import { dbConfig, User } from '../src/models';

beforeAll(async () => {
  process.env.JWT_KEY = 'test';

  await dbConfig.authenticate();

  dbConfig.sync();
});

beforeEach(async () => {
  await User.destroy({
    where: {},
    truncate: true,
  });
});

afterAll(async () => {
  await dbConfig.close();
});
