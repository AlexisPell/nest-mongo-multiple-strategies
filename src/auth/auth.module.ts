import { SessionSerializer } from './passport/passport.serializer';
import { UserSchema, User } from '../users/models/user.document';
import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

import { DiscordStrategy } from './strategies/discord.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { AuthController } from './controllers/auth.controller';
import { GoogleAuthController } from './controllers/google-auth.controller';
import { DiscordAuthController } from './controllers/discord-auth.controller';

@Module({
  controllers: [AuthController, GoogleAuthController, DiscordAuthController],
  providers: [
    AuthService,
    LocalStrategy,
    GoogleStrategy,
    DiscordStrategy,
    SessionSerializer,
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
