import { apiPrefix } from '../../common/constants/paths';
import { AuthenticatedGuard } from '../guards/isAuthenticated.guard';
import { DiscordAuthGuard } from '../guards/discord.guard';
import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '../guards/local.guard';

@Controller('auth')
export class SSOAuthController {
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    res.redirect(`${apiPrefix}/auth/discord/me`);
  }

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
  @Get('/discord/logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect(`${apiPrefix}/auth/discord/me`);
  }

  @Get('/me')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    console.log('REQUEST USER:', req.user);
    console.log('REQUEST SESSION:', req.session);
    console.log('REQUEST COOKIE:', req.cookies);
    return req.user;
  }
}
