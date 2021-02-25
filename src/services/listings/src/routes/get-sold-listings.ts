import { ListingStatus, requireAuth } from '@jjmauction/common';
import express, { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Listing } from '../models';

const router = express.Router();

router.get(
  '/api/listings/sold',
  requireAuth,
  async (req: Request, res: Response) => {
    const listings = await Listing.findAll({
      where: {
        [Op.and]: [
          { userId: req.currentUser.id },
          { status: { [Op.not]: ListingStatus.Active } },
          { status: { [Op.not]: ListingStatus.Expired } },
        ],
      },
    });

    res.status(200).send(listings);
  }
);

export { router as getSoldListingsRouter };
