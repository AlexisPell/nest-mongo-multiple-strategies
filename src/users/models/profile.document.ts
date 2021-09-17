import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.document';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile extends Document {
  @ApiProperty({
    description: 'Link to user',
    example: 'ObjectId',
    type: () => User,
  })
  @Prop({ type: { type: MongooseSchema.Types.ObjectId, ref: 'User' } })
  user: User;

  @ApiProperty({ description: 'Username', example: 'SteveJob' })
  @Prop({ type: String })
  username: string;

  @ApiProperty({ description: 'Name', example: 'Steve' })
  @Prop({ type: String })
  name: string;

  @ApiProperty({ description: 'Last name', example: 'Jobs' })
  @Prop({ type: String })
  lastName: string;

  @ApiProperty({
    description: 'About yourself. City, occupation, age...',
    example: 'Alex Pell, 23 y.o, Saint-P',
  })
  @Prop({ type: String })
  bio: string;

  @ApiProperty({ description: 'Avatar of user', example: 'link to avatar' })
  @Prop({ type: String })
  avatar: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
