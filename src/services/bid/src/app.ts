import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@jjmauction/common';
import 'express-async-errors';

import { deleteBidRouter } from './routes/delete-bid';
import { createBidRouter } from './routes/create-bid';
import { getBidsRouter } from './routes/get-bids';
import { getUserBidsRouter } from './routes/get-users-bids';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));
app.use(currentUser);

app.use(deleteBidRouter);
app.use(createBidRouter);
app.use(getUserBidsRouter);
app.use(getBidsRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
