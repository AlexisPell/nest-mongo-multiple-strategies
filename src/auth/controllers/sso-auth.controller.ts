import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { CreateUserDto } from './../../users/dto/create-user.dto';
import { AuthenticatedGuard } from '../guards/isAuthenticated.guard';
import { DiscordAuthGuard } from '../guards/discord.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../auth.service';

@Controller('auth')
export class SSOAuthController {
  constructor(private authService: AuthService) {}
  @Get('me')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    console.log('REQUEST USER:', req.user);
    console.log('REQUEST SESSION:', req.session);
    console.log('REQUEST COOKIE:', req.cookies);
    return req.user;
  }
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect(`me`);
  }

  // LOCAL
  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    res.redirect(`me`);
  }
  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    await this.authService.registration(body);
    res.redirect(307, 'login');
  }

  // DISCORD
  @Get('/discord/login')
  @UseGuards(DiscordAuthGuard)
  loginDiscord() {
    return;
  }
  @Get('/discord/redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: any) {
    res.redirect(`me`);
  }
}
