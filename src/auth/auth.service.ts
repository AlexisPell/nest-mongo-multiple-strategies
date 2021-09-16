import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { User, UserDocument } from './../users/user.document';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Profile as DiscordProfile } from 'passport-discord';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = this.userModel.findOne({ email: userDto.email });
    return user;
  }

  async registration(userDto: CreateUserDto) {
    console.log('AUTH SERVICE / REGISTRATION');
    const candidate = await this.userModel.findOne({ email: userDto.email });
    if (candidate) throw new BadRequestException('Such user already exists');
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const _user: CreateUserDto = { ...userDto, password: hashPassword };
    const user = await this.userModel.create(_user);
    return user;
  }

  async validateDiscordProfile(userDto: DiscordProfile): Promise<User> {
    console.log('AUTH SERVICE / VALIDATE DISCORD / INIT', userDto);
    const user = await this.userModel.findOne({ discordId: userDto.id });
    console.log('AUTH SERVICE / VALIDATE DISCORD / USER', user);
    if (user) return user;
    const newUser = await this.usersService.createForDiscordStrategy(userDto);
    console.log('AUTH SERVICE / VALIDATE DISCORD / NEW USER', newUser);
    return newUser;
  }
  async validateGoogleProfile(userDto: GoogleProfile): Promise<User> {
    console.log('AUTH SERVICE / VALIDATE GOOGLE / INIT', userDto);
    const user = await this.userModel.findOne({ googleId: userDto.id });
    console.log('AUTH SERVICE / VALIDATE GOOGLE / USER', user);
    if (user) return user;
    const newUser = await this.usersService.createForGoogleStrategy(userDto);
    console.log('AUTH SERVICE / VALIDATE GOOGLE / NEW USER', newUser);
    return newUser;
  }
  async validateLocalUser(userDto: CreateUserDto): Promise<User | undefined> {
    console.log('AUTH SERVICE / VALIDATE LOCAL / INIT');
    const user = await this.userModel.findOne({ email: userDto.email });
    if (!user)
      throw new BadRequestException('User with such credentials not found');
    console.log('AUTH SERVICE / VALIDATE LOCAL / USER FOUND', user);
    const passwordsEqual = await bcrypt.compare(
      userDto.password,
      user.password || '',
    );
    if (passwordsEqual) {
      console.log('AUTH SERVICE / VALIDATE LOCAL / PASSWORD MATCHED');
      return user;
    }
    if (!passwordsEqual)
      throw new BadRequestException('Wrong password provided');
    return;
  }
}
