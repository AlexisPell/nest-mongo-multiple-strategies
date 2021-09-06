import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDocument } from 'src/users/user.document';
import { UsersService } from 'src/users/users.service';
import { Done } from '../auth.constants';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  // usersService here
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: UserDocument, done: Done) {
    console.log('PASSPORT SERIALIZER:', user);
    done(null, user);
  }

  async deserializeUser(user: UserDocument, done: Done) {
    console.log('PASSPORT DESERIALIZER:', user);
    const userDb = await this.usersService.getUserByEmail(user.email);
    console.log('PASSPORT DESERIALIZER / FOUND USER:', userDb);

    return userDb ? done(null, userDb) : done(null, null);
  }
}
