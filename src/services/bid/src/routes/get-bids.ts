import express, { Request, Response } from 'express';

import { currentUser } from '@jjmauction/common';

const router = express.Router();

router.get(
  '/api/bids/:orderId',
  currentUser,
  (req: Request, res: Response) => {}
);

export { router as getBidsRouter };
