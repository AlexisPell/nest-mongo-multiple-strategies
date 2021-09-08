import { GoogleAuthGuard } from '../guards/google.guard';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('auth')
export class GoogleAuthController {
  constructor(private authService: AuthService) {}

  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  loginDiscord() {
    return;
  }
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect(@Res() res: any) {
    res.redirect(`me`);
  }
}
