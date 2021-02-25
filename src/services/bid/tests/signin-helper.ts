import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const signup = () => {
  // Build a JWT payload. { id, email }
  const payload = {
    id: uuidv4(),
    email: 'test@test.com',
    name: 'user',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn session to JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // Return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};

export { signup };
