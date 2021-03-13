import {
  BadRequestError,
  NotFoundError,
  validateRequest,
} from '@jjmauction/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { User } from '../models';
import { comparePasswords } from '../utils/compare-passwords';
import { toHash } from '../utils/to-hash';

const router = express.Router();

router.post(
  '/api/auth/update-password',
  [
    body('oldPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Old Password must be between 4 and 20 characters'),
    body('newPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('New Password must be between 4 and 20 characters'),
    body('confirmPassword')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Confirm Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { confirmPassword, newPassword, oldPassword } = req.body;

    const user = await User.findOne({
      where: { id: req.currentUser?.id },
    });

    if (!user) {
      throw new NotFoundError();
    }

    if (!comparePasswords(user.password, oldPassword)) {
      throw new BadRequestError('Old password does not match');
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestError(
        'New password and confirm passwords to not match'
      );
    }

    const hashedPassword = await toHash(newPassword);

    user.update({ password: hashedPassword });

    res.status(201).send(user);
  }
);

export { router as updatePasswordRouter };
