import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import redis from 'redis';
import connectRedis from 'connect-redis';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { apiPrefix } from './common/constants/paths';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MyLogger } from './logger/pino-logger.service';
import { AsyncLocalStorage } from 'async_hooks';
import { v4 as uuidv4 } from 'uuid';
import { IAsyncStorage } from './common/interfaces/asyncStorage';
import { ASYNC_STORAGE } from './logger/logger.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(apiPrefix);

  // NOTE: remove custom logger but implement traceId into default one
  // // Logger Middleware
  // app.use((req: Request, res: Response, next: any) => {
  //   const asyncStorage: AsyncLocalStorage<IAsyncStorage> =
  //     app.get(ASYNC_STORAGE);
  //   const traceId = req.headers['x-request-id'] || uuidv4();
  //   const store = new Map().set('traceId', traceId);
  //   asyncStorage.run(store, () => {
  //     next();
  //   });
  // });
  // app.useLogger(app.get(MyLogger));

  const config = new DocumentBuilder()
    .setTitle('Default template swagger')
    .setDescription('Some pretty js-swagger documentation')
    .setVersion('1.0.0')
    .addTag('Hello World')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  const redisClient = redis.createClient({ url: process.env.REDIS_URI });
  const RedisStore = connectRedis(session);

  app.use(cookieParser());

  app.use(
    session({
      cookie: { maxAge: 60000 * 60 * 24, httpOnly: true }, // day
      secret: process.env.SESSION_SECRET,
      name: 'userSession',
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({ client: redisClient }),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT as string;
  await app.listen(PORT, () =>
    console.log(`SERVER IS RUNNING ON PORT ${process.env.PORT}`),
  );
}
bootstrap();
