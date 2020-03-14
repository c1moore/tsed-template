import { NextFunction as ExpressNext, Response as ExpressResponse } from 'express';
import {
  MiddlewareError, IMiddlewareError, Response, Next, Err, $log,
} from '@tsed/common';
import { Exception } from 'ts-httpexceptions';
import { inspect } from 'util';

import ErrorPayload from '../models/ErrorPayload';

@MiddlewareError()
export default class ErrorMiddleware implements IMiddlewareError {
  use(
        @Err() error: any,
        @Response() res: ExpressResponse,
        @Next() next: ExpressNext,
  ): void {
    if (res.headersSent) {
      return next(error);
    }

    if (error instanceof Exception) {
      return this.handleError(res, error.status, { message: error.message });
    }

    if (typeof error === 'string') {
      return this.handleError(res, 404, { message: error });
    }

    this.handleError(res, error.status || 500, {
      message: error.message || 'Internal Error',
    });
  }

  private handleError(res: ExpressResponse, status: number, payload: ErrorPayload): void {
    $log.error(inspect(payload));

    res.status(status).json(payload);
  }
}
