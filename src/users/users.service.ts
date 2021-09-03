import { Profile as DiscordProfile } from 'passport-discord';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument, User } from './user.document';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      console.log('USER SERVICE / GET BY EMAIL');
      throw new NotFoundException("User with such email doesn't exist");
    }
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      console.log('USER SERVICE / GET BY ID');
      throw new NotFoundException("User with such email doesn't exist");
    }
    return user;
  }

  async createLocal(validatedDto: CreateUserDto): Promise<User> {
    const candidate = await this.userModel.findOne({
      email: validatedDto.email,
    });
    if (candidate) {
      throw new BadRequestException('User with such email already exists');
    }
    const user = await this.userModel.create(validatedDto);
    return user;
  }

  async createForDiscord(profileDto: DiscordProfile): Promise<User> {
    console.log('USERS SERVICE / createForDiscord');
    const candidateByDiscordId = await this.userModel.findOne({
      discordId: profileDto.id,
    });
    if (candidateByDiscordId) return candidateByDiscordId;
    const user = await this.userModel.create(profileDto);
    return user;
  }
}
