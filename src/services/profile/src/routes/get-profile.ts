import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  requireAuth,
} from '@jjmauction/common';
import { Profile } from '../models';

const router = express.Router();

router.get(
  '/api/profile/',
  requireAuth,
  async (req: Request, res: Response) => {
    const profile = await Profile.findOne({
      where: { userId: req.currentUser.id },
    });

    if (!profile) {
      throw new NotFoundError();
    }

    res.status(200).send(profile);
  }
);

export { router as getProfileRouter };
