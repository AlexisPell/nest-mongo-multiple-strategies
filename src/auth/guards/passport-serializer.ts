import { AuthService } from './../auth.service';
import { User } from './../../users/user.schema';
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async serializeUser(user: User, done: (...a: any) => any): Promise<any> {
    console.log(
      '🚀 ~ file: passport-serializer.ts ~ line 13 ~ SessionSerializer ~ serializeUser ~ user',
      user,
    );
    done(null, user);
  }
  async deserializeUser(
    payload: any,
    done: (err: Error, user: User) => void,
  ): Promise<any> {
    console.log(
      '🚀 ~ file: passport-serializer.ts ~ line 20 ~ SessionSerializer ~ payload',
      payload,
    );
    const userDb = await this.authService.findUser(payload.discordId);
    console.log(
      '🚀 ~ file: passport-serializer.ts ~ line 22 ~ SessionSerializer ~ userDb',
      userDb,
    );
    if (!userDb) {
      console.log('DESERIALIZE USER ERROR');
    }
    return userDb ? done(null, userDb) : done(null, null);
  }
}
