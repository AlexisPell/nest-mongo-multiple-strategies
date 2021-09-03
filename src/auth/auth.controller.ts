import { DiscordAuthGuard } from './guards/discord.guard';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('/discord/login')
  @UseGuards(DiscordAuthGuard)
  login(@Req() req: any) {
    return;
  }

  @Get('/discord/redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Req() req: any, @Res() res: any) {
    console.log('REQUEST USER:', req.user);
    console.log('REQUEST SESSION:', req.session);
    console.log('REQUEST COOKIE:', req.cookies);
    res.json({
      success: true,
      text: 'redirect success',
    });
  }

  @Get('/discord/status')
  status() {
    return;
  }

  @Get('/discord/logout')
  logout() {
    return;
  }
}
