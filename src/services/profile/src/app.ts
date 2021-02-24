import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@jjmauction/common';
import 'express-async-errors';

import { getProfileRouter } from './routes/get-profile';
import { updateProfileRouter } from './routes/update-profile';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({ signed: false, secure: false }));
app.use(currentUser);

app.use(getProfileRouter);
app.use(updateProfileRouter);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
