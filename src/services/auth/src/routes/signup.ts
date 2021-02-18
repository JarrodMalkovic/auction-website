import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest, BadRequestError } from '@jjmauction/common';
import { Op } from 'sequelize';
import gravatar from 'gravatar';

import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { User } from '../models';
import { toHash } from '../utils/to-hash';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/auth/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { name }] },
    });

    if (existingUser) {
      throw new BadRequestError('That email or username is already in use');
    }

    const hashedPassword = await toHash(password);

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    const user = await User.create({
      name,
      email,
      avatar,
      password: hashedPassword,
    });

    const userJwt = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_KEY!
    );

    new UserCreatedPublisher(natsWrapper.client).publish({
      // @ts-ignore
      id: user.id,
      name,
      email,
      avatar,
    });

    req.session = { jwt: userJwt };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
