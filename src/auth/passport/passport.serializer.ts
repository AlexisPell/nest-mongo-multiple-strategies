import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDocument } from 'src/users/user.document';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  // usersService here
  constructor() {
    super();
  }

  serializeUser(
    user: UserDocument,
    done: (err: Error, user: UserDocument) => void,
  ) {
    console.log('PASSPORT SERIALIZER:', user);
    done(null, user);
  }

  deserializeUser(
    user: UserDocument,
    done: (err: Error, user: UserDocument) => void,
  ) {
    console.log('PASSPORT DESERIALIZER:', user);
    const userDb = {} as any;
    done(null, userDb);
  }
}
