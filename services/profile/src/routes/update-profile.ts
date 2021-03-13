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
      .withMessage('Your first name must be less than 64 characters')
      .not()
      .isEmpty()
      .withMessage('firstName must be provided'),
    body('lastName')
      .isLength({ min: 0, max: 64 })
      .withMessage('Your last name must be less than 64 characters')
      .not()
      .isEmpty()
      .withMessage('lastName must be provided'),
    body('country')
      .isLength({ min: 0, max: 64 })
      .withMessage('Your country must be less than 64 characters')
      .not()
      .isEmpty()
      .withMessage('country must be provided'),
    body('about')
      .isLength({ min: 0, max: 500 })
      .withMessage(
        'Your profile about section must be less than 5000 characters'
      )
      .not()
      .isEmpty()
      .withMessage('about must be provided'),
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

    res.status(200).send(updatedProfile);
  }
);

export { router as updateProfileRouter };
