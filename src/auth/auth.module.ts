import { SessionSerializer } from './passport/passport.serializer';
import { UserSchema, User } from './../users/user.document';
import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { SSOAuthController } from './controllers/sso-auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

import { DiscordStrategy } from './strategies/discord.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [SSOAuthController],
  providers: [AuthService, SessionSerializer, DiscordStrategy, LocalStrategy],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => UsersModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
