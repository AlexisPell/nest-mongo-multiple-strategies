import { USERS } from './../auth.constants';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class DiscordAuthGuard extends AuthGuard(USERS.DISCORD) {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const activate = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    console.log(
      '🚀 ~ file: discord-auth.guard.ts ~ line 15 ~ DiscordAuthGuard ~ canActivate ~ request',
    );

    await super.logIn(request);

    return activate;
  }
}
