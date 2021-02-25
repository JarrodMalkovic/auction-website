import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../errors/custom-error';

// Goal here is to send a very consistent error response for all possible errors
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error(err);

  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
