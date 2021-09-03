import { User, UserSchema } from './../users/user.schema';
import { UsersModule } from './../users/users.module';
import { DiscordStrategy } from './strategies/discord-auth.strategy';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, DiscordStrategy],
})
export class AuthModule {}
