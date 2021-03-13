import { scrypt } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const comparePasswords = async (
  storedPassword: string,
  suppliedPassword: string
) => {
  const [hashedPassowrd, salt] = storedPassword.split('.');
  const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

  return buf.toString('hex') === hashedPassowrd;
};

export { comparePasswords };
