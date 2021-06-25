import {
  Catch,
  ExceptionFilterMethods,
  PlatformContext,
  PlatformResponse,
} from '@tsed/common';
import { Exception } from '@tsed/exceptions';

@Catch(Error)
export default class ErrorMiddleware implements ExceptionFilterMethods {
  catch(
    error: (Error | Exception) & { status?: number },
    ctx: PlatformContext,
  ): void {
    const { request: req, response: res, logger: $log } = ctx;

    $log.error({
      message: 'Error processing request.',
      url: req.url,
      method: req.method,
      status: error.status,
      errorMessage: error.message,
      errorStackTrace: error.stack,
      originalError: (error as Exception).origin,
    });

    if (res.isHeadersSent()) {
      return;
    }

    if (error instanceof Exception) {
      return this.handleError(res, error.status, { message: error.message });
    }

    this.handleError(res, error.status ?? 500, {
      message: error.message || 'Internal Error',
    });
  }

  private handleError(
    res: PlatformResponse,
    status: number,
    payload: {
      message: string;
    },
  ): void {
    res.status(status).body(payload);
  }
}
