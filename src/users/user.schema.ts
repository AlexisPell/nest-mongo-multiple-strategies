import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

export type IUser = {
  _id?: MongooseSchema.Types.ObjectId;
  email: string;
  password: string;
  username?: string;
  discordId?: string;
  discriminator?: string;
  avatar?: string;
};

@Schema()
export class User extends Document implements IUser {
  @Prop({ type: String, unique: true })
  username: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop({ type: String, minlength: 6 })
  password: string;

  @Prop({
    type: String,
    unique: true,
    // name: 'discord_id'
  })
  discordId: string;

  @Prop({ type: String })
  discriminator: string;

  @Prop({ type: String })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
