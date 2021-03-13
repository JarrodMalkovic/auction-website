import { ListingStatus } from '@jjmauction/common';
import express, { Request, Response } from 'express';
import { Op } from 'sequelize';

import { Listing } from '../models';

const router = express.Router();

router.get('/api/listings/expired', async (req: Request, res: Response) => {
  const listings = await Listing.findAll({
    where: {
      [Op.and]: [
        { userId: req.currentUser.id },
        { status: ListingStatus.Expired },
      ],
    },
  });

  res.status(200).send(listings);
});

export { router as getExpiredListingsRouter };
