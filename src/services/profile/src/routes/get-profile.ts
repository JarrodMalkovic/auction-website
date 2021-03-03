import { NotFoundError, requireAuth } from '@jjmauction/common';
import express, { Request, Response } from 'express';

import { Profile } from '../models';

const router = express.Router();

router.get(
  '/api/profile/',
  requireAuth,
  async (req: Request, res: Response) => {
    const profile = await Profile.findOne({
      where: { userId: req.currentUser.id },
    });

    console.log(req.currentUser.id);
    console.log(profile);

    if (!profile) {
      throw new NotFoundError();
    }

    res.status(200).send(profile);
  }
);

export { router as getProfileRouter };
