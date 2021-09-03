import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { User, UserDocument } from './../users/user.document';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Profile as DiscordProfile } from 'passport-discord';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isEqual } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateDiscordProfile(userDto: DiscordProfile): Promise<User> {
    console.log('AUTH SERVICE / VALIDATE / INIT', userDto);
    const user = await this.userModel.findOne({ discordId: userDto.id });
    console.log('AUTH SERVICE / VALIDATE / USER', user);
    if (user) return user;
    const newUser = await this.usersService.createForDiscord(userDto);

    console.log('AUTH SERVICE / VALIDATE / NEW USER', newUser);

    throw new UnauthorizedException('User with such credentials not found');
  }
}
