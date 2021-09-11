import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ description: 'User email', example: 'my-mail@gmail.com' })
  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty({ description: 'Password', example: 'password' })
  @Prop({ type: String, minlength: 6 })
  password: string;

  @ApiProperty({
    description: 'If verified locally or somewhere else',
    example: true,
  })
  @Prop({ type: Boolean, default: false })
  locallyVerified: boolean;

  @ApiProperty({ description: 'Username', example: 'SteveJob' })
  @Prop({ type: String, minlength: 6, required: false })
  username: string;

  @ApiProperty({ description: 'Avatar of user', example: 'link to avatar' })
  @Prop({ type: String })
  avatar: string;

  @ApiProperty({ description: 'google account id' })
  @Prop({ type: String, unique: true, sparse: true }) // sparse to let uniqie while null
  googleId: string;
  @ApiProperty({ description: 'discord account id' })
  @Prop({ type: String, unique: true, sparse: true }) // sparse to let uniqie while null
  discordId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
