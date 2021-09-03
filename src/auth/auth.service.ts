import { User, UserDocument } from './../users/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(userDto: any): Promise<any> {
    // console.log(
    //   '🚀 ~ file: auth.service.ts ~ line 11 ~ AuthService ~ validateUser ~ userDto',
    //   userDto,
    // );
    // const user = await this.userModel.findById(parseInt(userDto.id));
    const user = await this.userModel.findOne({ email: userDto.email });
    console.log(
      '🚀 ~ file: auth.service.ts ~ line 13 ~ AuthService ~ validateUser ~ user',
      user,
    );
    if (user) {
      return user;
    }

    const newUser = await this.createUser(userDto);

    return newUser;
  }

  async createUser(userDto: User): Promise<any> {
    const user = this.userModel.create(userDto);
    return user;
  }

  async findUser(discordId: string): Promise<User | undefined> {
    return this.userModel.findById(discordId);
  }
}
