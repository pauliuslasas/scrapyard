import { NextFunction, Request, Response } from 'express';
import { ExpressJoiError } from 'express-joi-validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function joiErrorHandler(err: ExpressJoiError, _req: Request, res: Response, next: NextFunction) {
  if (err && err.error && err.error.isJoi) {
    return res.status(400).json({
      type: err.type,
      message: err.error.toString(),
    });
  } else {
    return next(err);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function errorHandler(err: Error & { status: number }, _req: Request, res: Response, next: NextFunction) {
  if (err) {
    return res.status(err.status || 500).json({
      status: err.status,
      type: err.name,
      message: err.message,
    });
  } else {
    return next(err);
  }
}
