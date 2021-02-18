import express, { Request, Response } from 'express';
import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
  ListingStatus,
  BadRequestError,
} from '@jjmauction/common';

import { Bid, db, Listing } from '../models';
import { natsWrapper } from '../nats-wrapper';
import { BidDeletedPublisher } from '../events/publishers/bid-deleted-publisher';
import { BidAttributes, BidModel } from '../models/bid';
import { Op } from 'sequelize';

const router = express.Router();

router.delete(
  '/api/bids/:bidId',
  requireAuth,
  async (req: Request, res: Response) => {
    await db.transaction(async (transaction) => {
      const bidId = req.params.bidId;

      const bid = await Bid.findOne({ where: { id: bidId } });

      if (!bid) {
        throw new NotFoundError();
      }

      if (bid.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
      }

      const listing = await Listing.findOne({ where: { id: bid.listingId } });

      if (!listing) {
        throw new NotFoundError();
      }

      if (listing.status !== ListingStatus.Active) {
        throw new BadRequestError(
          'You can only delete bids on listings which are active'
        );
      }

      await bid.destroy({ transaction });

      // Check if the deleted bid was the current winning bid
      if (bid.amount === listing.currentPrice) {
        const bids = (
          await Bid.findAll({
            where: {
              [Op.and]: [
                { listingId: bid.listingId },
                { id: { [Op.not]: bid.id } },
              ],
            },
          })
        ).map((el: BidModel) => el.get({ plain: true }));

        const currentWinningBid = bids.length
          ? bids.reduce((prev: BidAttributes, current: BidAttributes) =>
              prev.amount > current.amount ? prev : current
            )
          : { amount: listing.startPrice, userId: undefined };

        listing.set({
          currentWinnerId: currentWinningBid.userId,
          currentPrice: currentWinningBid.amount,
        });

        await listing.save({ transaction });

        await new BidDeletedPublisher(natsWrapper.client).publish({
          id: listing.id,
          newPrice: currentWinningBid.amount,
        });
      }

      res.status(204).send({});
    });
  }
);

export { router as deleteBidRouter };
