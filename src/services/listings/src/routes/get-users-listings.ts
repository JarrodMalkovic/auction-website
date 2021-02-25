import { requireAuth } from '@jjmauction/common';
import express, { Request, Response } from 'express';

import { Listing } from '../models';

const router = express.Router();

router.get(
  '/api/listings/me',
  requireAuth,
  async (req: Request, res: Response) => {
    const listings = await Listing.findAll({
      where: { userId: req.currentUser.id },
    });

    res.status(200).send(listings);
  }
);

export { router as getUserListingsRouter };
