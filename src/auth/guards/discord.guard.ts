import { STRATEGIES } from './../auth.constants';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class DiscordAuthGuard extends AuthGuard(STRATEGIES.DISCORD) {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    console.log('DISCORD AUTH GUARD');
    const activate = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return activate;
  }
}
