import express, { Request, Response } from 'express';
import {
  NotFoundError,
  requireAuth,
  BadRequestError,
  validateRequest,
  ListingStatus,
} from '@jjmauction/common';

import { BidCreatedPublisher } from '../events/publishers/bid-created-publisher';
import { db, Bid, Listing } from '../models';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/bids/:listingId',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    await db.transaction(async (transaction) => {
      const { amount } = req.body;
      const listingId = req.params.listingId;

      const listing = await Listing.findOne({ where: { id: listingId } });

      if (!listing) {
        throw new NotFoundError();
      }

      if (listing.status !== ListingStatus.Active) {
        throw new BadRequestError(
          'You can only bid on listings which are active'
        );
      }

      if (listing.currentPrice >= amount) {
        throw new BadRequestError('Bids must be greater than the current bid');
      }

      if (req.currentUser!.id === listing.userId) {
        throw new BadRequestError(
          'Sellers cannot place bids on there own listings'
        );
      }

      const bid = await Bid.create(
        {
          listingId,
          amount: Math.floor(amount),
          userId: req.currentUser!.id,
        },
        { transaction }
      );

      listing.set({ currentPrice: amount });
      await listing.save({ transaction });

      await new BidCreatedPublisher(natsWrapper.client).publish({
        listingId,
        amount,
        userId: req.currentUser!.id,
      });

      res.status(201).send(bid);
    });
  }
);

export { router as createBidRouter };
