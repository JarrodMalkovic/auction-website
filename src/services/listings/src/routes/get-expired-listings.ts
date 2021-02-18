import express, { Request, Response } from 'express';
import { Listing, User } from '../models';
import { ListingStatus } from '@jjmauction/common';
import { Op } from 'sequelize';

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
