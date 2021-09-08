import { apiPrefix } from './../../common/constants/paths';
import { DiscordAuthGuard } from '../guards/discord.guard';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('auth')
export class DiscordAuthController {
  constructor(private authService: AuthService) {}

  @Get('/discord/login')
  @UseGuards(DiscordAuthGuard)
  loginDiscord() {
    return;
  }
  @Get('/discord/redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: any) {
    res.redirect(`${apiPrefix}/auth/me`);
  }
}
