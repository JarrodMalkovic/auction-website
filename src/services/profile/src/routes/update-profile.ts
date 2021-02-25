import {
  NotFoundError,
  requireAuth,
  validateRequest,
} from '@jjmauction/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Profile } from '../models';

const router = express.Router();

router.patch(
  '/api/profile',
  requireAuth,
  [
    body('firstName')
      .isLength({ min: 0, max: 64 })
      .withMessage('Your first name must be less than 64 characters'),
    body('lastName')
      .isLength({ min: 0, max: 64 })
      .withMessage('Your last name must be less than 64 characters'),
    body('country')
      .isLength({ min: 0, max: 64 })
      .withMessage('Your country must be less than 64 characters'),
    body('about')
      .isLength({ min: 0, max: 500 })
      .withMessage(
        'Your profile about section must be less than 5000 characters'
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { firstName, lastName, country, about } = req.body;

    const profile = await Profile.findOne({
      where: { userId: req.currentUser.id },
    });

    if (!profile) {
      throw new NotFoundError();
    }

    const updatedProfile = await profile.update({
      firstName,
      lastName,
      country,
      about,
    });

    res.status(201).send(updatedProfile);
  }
);

export { router as updateProfileRouter };
