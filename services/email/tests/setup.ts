jest.mock('../src/nats-wrapper.ts');
jest.mock('nodemailer');

const nodemailer = require('nodemailer');
nodemailer.createTransport.mockReturnValue({
  sendMail: jest.fn(),
});

beforeEach(async () => {
  jest.clearAllMocks();
  nodemailer.createTransport.mockClear();
});
