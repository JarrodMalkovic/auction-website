import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@jjmauction/common';
import 'express-async-errors';

import { deleteListingRouter } from './routes/delete-listing';
import { createListingRouter } from './routes/create-listing';
import { getListingRouter } from './routes/get-listing';
import { getListingsRouter } from './routes/get-listings';
import { getSoldListingsRouter } from './routes/get-sold-listings';
import { getExpiredListingsRouter } from './routes/get-expired-listings';
import { getUserListingsRouter } from './routes/get-users-listings';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));
app.use(currentUser);

app.use(deleteListingRouter);
app.use(createListingRouter);
app.use(getListingsRouter);
app.use(getSoldListingsRouter);
app.use(getExpiredListingsRouter);
app.use(getUserListingsRouter);
app.use(getListingRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
