import type { Response, Request, NextFunction } from 'express';

import {
  ForbiddenError,
  ExceptionError,
  NotFoundError,
  ValidateError,
  UnauthorizedError,
} from '@/errors';
import { GENERIC_ERROR } from '@/utils/constants';

import type { ControlledErrors } from '@/types/errorType';

export const errorHandlerMiddleware = async (
  err: ControlledErrors | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { statusCode, body } = mapErrorToResponse(err);
  return res.status(statusCode).json(body);
};

const mapErrorToResponse = (err: ControlledErrors | Error) => {
  if (
    err instanceof ValidateError ||
    err instanceof NotFoundError ||
    err instanceof UnauthorizedError ||
    err instanceof ForbiddenError ||
    err instanceof ExceptionError
  ) {
    return { statusCode: err.statusCode, body: { message: err.message, trace: err.trace } };
  }

  const trace = 'ERR001';
  const genericError = new ExceptionError(trace, (err as Error)?.stack || GENERIC_ERROR);
  return { statusCode: 500, body: genericError };
};
