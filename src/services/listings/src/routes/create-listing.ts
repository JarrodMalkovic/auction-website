import {
  BadRequestError,
  requireAuth,
  validateRequest,
} from '@jjmauction/common';
import cloudinary from 'cloudinary';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import multer from 'multer';

import { ListingCreatedPublisher } from '../events/publishers/listing-created-publisher';
import { Listing, db } from '../models';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  '/api/listings',
  upload.single('image'),
  requireAuth,
  [
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('title')
      .isLength({ min: 3, max: 100 })
      .withMessage('The listing title must be between 5 and 1000 characters'),
    body('expiresAt').custom((value) => {
      let enteredDate = new Date(value);
      let tommorowsDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
      if (enteredDate <= tommorowsDate)
        throw new BadRequestError('Invalid Date');
      return true;
    }),
    body('description')
      .isLength({ min: 5, max: 500 })
      .withMessage(
        'The listing description must be between 5 and 500 characters'
      ),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    await db.transaction(async (transaction) => {
      const { price, title, description, expiresAt } = req.body;

      // @ts-ignore
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        eager: [
          { width: 225, height: 225 },
          { width: 1280, height: 1280 },
        ],
      });

      const listing = await Listing.create(
        {
          userId: req.currentUser.id,
          startPrice: price,
          currentPrice: price,
          title,
          description,
          expiresAt,
          imageId: result.public_id,
          smallImage: result.eager[0].secure_url,
          largeImage: result.eager[1].secure_url,
        },
        { transaction }
      );

      new ListingCreatedPublisher(natsWrapper.client).publish({
        id: listing.id,
        userId: req.currentUser.id,
        slug: listing.slug,
        title,
        price,
        expiresAt,
      });

      res.status(201).send(listing);
    });
  }
);

export { router as createListingRouter };
