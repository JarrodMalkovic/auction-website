import express, { Request, Response } from 'express';
import { db, Listing } from '../models';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from '@jjmauction/common';
import { ListingDeletedPublisher } from '../events/publishers/listing-deleted-publisher';
import { natsWrapper } from '../nats-wrapper';
import { socketIOWrapper } from '../socket-io-wrapper';

const router = express.Router();

router.delete(
  '/api/listings/:listingId',
  requireAuth,
  async (req: Request, res: Response) => {
    await db.transaction(async (transaction) => {
      const listingId = req.params.listingId;

      const listing = await Listing.findOne({
        where: { id: listingId },
      });

      if (!listing) {
        throw new NotFoundError();
      }

      if (listing.userId !== req.currentUser.id) {
        throw new NotAuthorizedError();
      }

      await Listing.destroy({
        where: {
          id: listingId,
        },
        transaction,
      });

      new ListingDeletedPublisher(natsWrapper.client).publish({
        id: listingId,
      });

      await socketIOWrapper.io
        .of('/socket')
        .to(listing.slug)
        .emit('listing-deleted', null);

      res.status(204).send(listing);
    });
  }
);

export { router as deleteListingRouter };
