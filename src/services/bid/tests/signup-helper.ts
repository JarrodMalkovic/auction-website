import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

export const signup = () => {
  const id = uuidv4();

  const payload = {
    id,
    email: 'test@test.com',
  };

  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return { cookie: `express:sess=${base64}`, id };
};
