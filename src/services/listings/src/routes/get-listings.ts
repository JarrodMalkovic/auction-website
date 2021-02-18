import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';

import { Listing } from '../models';

const router = express.Router();

router.get('/api/listings/', async (req: Request, res: Response) => {
  const search = req.query.search || '';

  const listings = search
    ? await Listing.findAll({
        attributes: {
          include: [
            [
              Sequelize.literal(
                `MATCH (title) AGAINST('${search}' IN NATURAL LANGUAGE MODE)`
              ),
              'score',
            ],
          ],
        },
        where: Sequelize.literal(
          `MATCH (title) AGAINST('${search}' IN NATURAL LANGUAGE MODE)`
        ),
        order: [[Sequelize.literal('score'), 'DESC']],
      })
    : await Listing.findAll();

  res.status(200).send(listings);
});

export { router as getListingsRouter };
