import { currentUser } from '@jjmauction/common';
import express, { Request, Response } from 'express';

import { User } from '../models';

const router = express.Router();

router.get(
  '/api/auth/current-user',
  currentUser,
  async (req: Request, res: Response) => {
    if (!req.currentUser) {
      return res.send(null);
    }

    const currentUser = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.currentUser.id },
    });

    res.send({ currentUser });
  }
);

export { router as currentUserRouter };
