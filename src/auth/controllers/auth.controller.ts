import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { CreateUserDto } from './../../users/dto/create-user.dto';
import { AuthenticatedGuard } from '../guards/isAuthenticated.guard';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../auth.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { User } from 'src/users/user.document';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Get me, if logged in' })
  @ApiOkResponse({ type: User, description: 'User' })
  @Get('me')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    console.log('REQUEST USER:', req.user);
    console.log('REQUEST SESSION:', req.session);
    console.log('REQUEST COOKIE:', req.cookies);
    this.logger.log('Request user:', req.user);
    return req.user;
  }

  @Get('mi')
  stat() {
    throw new Error('Ker');
  }

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

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.redirect(`me`);
  }
}
