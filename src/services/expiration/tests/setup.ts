jest.mock('../src/nats-wrapper');
jest.mock('../src/queues/expiration-queue.ts');

beforeAll(async () => {
  process.env.JWT_KEY = 'test';
});

beforeEach(async () => {
  jest.clearAllMocks();
});
