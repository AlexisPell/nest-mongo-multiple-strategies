import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  app.use(cookieParser());

  app.use(
    session({
      cookie: { maxAge: 60000 * 60 * 24 }, // day
      secret: process.env.SESSION_SECRET,
      name: 'userSession',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
