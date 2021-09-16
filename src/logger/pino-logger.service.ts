import { ASYNC_STORAGE } from './logger.constants';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import pino from 'pino';
import { AsyncLocalStorage } from 'async_hooks';
// import colors from 'colors/safe';

const logger = pino({
  prettifier: true,
  prettyPrint: true,
});

@Injectable()
export class MyLogger implements LoggerService {
  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly asyncStorage: AsyncLocalStorage<Map<string, string>>,
  ) {}

  private getMessage(message: any, context?: string) {
    return context ? `[ ${context} ] ${message}` : message;
  }

  log(message: any, context?: string) {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    logger.info({ traceId }, this.getMessage(message, context));
  }

  error(message: any, trace?: string, context?: string) {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    logger.error({ traceId }, this.getMessage(message, context));
    if (trace) {
      logger.error(trace);
    }
  }

  warn(message: any, context?: string) {
    const traceId = this.asyncStorage.getStore()?.get('traceId');
    logger.warn({ traceId }, this.getMessage(message, context));
  }
}
