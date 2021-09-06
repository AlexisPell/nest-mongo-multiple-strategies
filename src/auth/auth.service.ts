import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { User, UserDocument } from './../users/user.document';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Profile as DiscordProfile } from 'passport-discord';
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
    const user = await this.usersService.create({
      ...userDto,
      password: hashPassword,
    });
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
  async validateLocalUser(userDto: CreateUserDto): Promise<User> {
    console.log('AUTH SERVICE / VALIDATE LOCAL / INIT');
    const user = await this.userModel.findOne({ email: userDto.email });
    if (!user)
      throw new BadRequestException('User with such credentials not found');
    console.log('AUTH SERVICE / VALIDATE LOCAL / USER FOUND');
    const passwordsEqual = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    console.log('AUTH SERVICE / VALIDATE LOCAL / PASSWORD MATCHED');
    if (passwordsEqual) return user;
    if (!passwordsEqual)
      throw new BadRequestException('Wrong password provided');
  }
}
// TODO: Login under protection
// In login validate only find user
// Register reroutes to login on finish
