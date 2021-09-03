import { AuthService } from './../auth.service';
import { Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Profile } from 'passport';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URI,
      scope: ['identify', 'email', 'guilds'],
    });
  }

  // First step to consume the data from sso
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile | any,
  ) {
    console.log(
      '🚀 ~ file: discord-auth.strategy.ts ~ line 23 ~ DiscordStrategy ~ classDiscordStrategyextendsPassportStrategy ~ profile',
      profile,
    );
    return this.authService.validateUser(profile);
  }
}
