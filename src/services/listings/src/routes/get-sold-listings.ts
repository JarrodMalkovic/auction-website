import express, { Request, Response } from 'express';
import { Listing, User } from '../models';
import { requireAuth, ListingStatus } from '@jjmauction/common';
import { Op } from 'sequelize';

const router = express.Router();

router.get(
  '/api/listings/sold',
  requireAuth,
  async (req: Request, res: Response) => {
    const listings = await Listing.findAll({
      where: {
        [Op.and]: [
          { userId: req.currentUser.id },
          {
            [Op.or]: [
              { status: { [Op.not]: ListingStatus.Active } },
              { status: { [Op.not]: ListingStatus.Expired } },
            ],
          },
        ],
      },
    });

    res.status(200).send(listings);
  }
);

export { router as getSoldListingsRouter };
