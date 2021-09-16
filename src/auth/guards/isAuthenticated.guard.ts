import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const req: Express.Request = context.switchToHttp().getRequest();

    const isAuthenticated = req.isAuthenticated();
    if (!isAuthenticated) {
      console.log(
        'AUTHENTICATED GUARD / req.isAuthenticated:',
        isAuthenticated,
        req.user,
        req.session,
      );
    }
    return isAuthenticated;
  }
}
