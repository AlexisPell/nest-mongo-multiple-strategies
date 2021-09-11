import { Profile as DiscordProfile } from 'passport-discord';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument, User } from './user.document';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      console.log('USER SERVICE / GET BY ID');
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

  async createUser(validatedDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(validatedDto);
    return user;
  }

  async createForDiscordStrategy(
    discordPayload: DiscordProfile,
  ): Promise<User> {
    console.log('USERS SERVICE / createForDiscord');
    const candidateByDiscordId = await this.userModel.findOne({
      discordId: discordPayload.id,
    });
    if (candidateByDiscordId) return candidateByDiscordId;
    const userPayload: Partial<User> = {
      email: discordPayload.email,
      locallyVerified: discordPayload.verified,
      username: discordPayload.username,
      discordId: discordPayload.id,
      avatar: discordPayload.avatar,
    };
    const user = await this.userModel.create(userPayload);
    return user;
  }
  async createForGoogleStrategy(googlePayload: GoogleProfile): Promise<User> {
    console.log('USERS SERVICE / createForGoogle');
    const candidateByGoogleId = await this.userModel.findOne({
      discordId: googlePayload.id,
    });
    if (candidateByGoogleId) return candidateByGoogleId;

    const userPayload: Partial<User> = {
      email: googlePayload._json.email,
      locallyVerified: googlePayload._json.email_verified,
      username: googlePayload._json.name,
      googleId: googlePayload.id,
      ...(googlePayload.photos[0].value && {
        avatar: googlePayload.photos[0].value,
      }),
    };
    const user = await this.userModel.create(userPayload);
    return user;
  }

  // TODO: For further re-working
  // private async checkUnverifiedSameEmails(checkingEmail: string) {
  //   const usersWithSameEmail = await this.userModel.find({
  //     email: checkingEmail,
  //   });
  //   if (usersWithSameEmail.length) {
  //     console.log(`USERS SERVICE / REMOVING UNVERIFIED EMAIL`);
  //     const unverifiedSameMails = usersWithSameEmail
  //       .filter((u) => !u.locallyVerified)
  //       .map((u) => u.email);
  //     await this.userModel.deleteMany({ email: { $in: unverifiedSameMails } });
  //   }
  // }
}
