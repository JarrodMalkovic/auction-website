import { NotFoundError } from '@jjmauction/common';
import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';

import { Listing, User } from '../models';

const router = express.Router();

router.get(
  '/api/listings/:listingSlug',
  async (req: Request, res: Response) => {
    const listingSlug = req.params.listingSlug;

    const listing = await Listing.findOne({
      include: {
        model: User,
      },
      where: { slug: listingSlug },
    });

    if (!listing) {
      throw new NotFoundError();
    }

    res.status(200).send(listing);
  }
);

export { router as getListingRouter };
