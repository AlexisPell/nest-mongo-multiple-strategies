import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from './logger.constants';
import { MyLogger } from './pino-logger.service';

const asyncLocalStorage = new AsyncLocalStorage();

@Module({
  providers: [
    MyLogger,
    {
      provide: ASYNC_STORAGE,
      useValue: asyncLocalStorage,
    },
  ],
  exports: [MyLogger],
})
export class LoggerModule {}
