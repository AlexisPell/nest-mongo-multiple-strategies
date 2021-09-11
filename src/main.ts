import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { apiPrefix } from './common/constants/paths';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(apiPrefix);

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

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
