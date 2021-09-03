import { DiscordAuthGuard } from './guards/discord-auth.guard';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('discord/login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return;
  }

  @Get('discord/redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    res.sendStatus(200).json({ msg: 'ITS OK!' });
  }

  @Get('discord/status')
  status(@Req() req: any) {
    console.log('COOKIES', req.cookies);
    console.log('USER', req.user);
    return;
  }

  @Get('discord/logout')
  logout() {
    return;
  }

  @Get('/cookies')
  getCookies(@Req() req: any) {
    const cookies = req.cookies;
    console.log(
      '🚀 ~ file: auth.controller.ts ~ line 32 ~ AuthController ~ getCookies ~ cookies',
      cookies,
    );
    return cookies;
  }
}
