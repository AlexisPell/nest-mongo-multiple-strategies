import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Boolean, default: false })
  locallyVerified: boolean;

  @Prop({ type: String, minlength: 6 })
  password: string;

  @Prop({ type: String, minlength: 6, required: false })
  username: string;

  @Prop({ type: String })
  discordId: string;

  @Prop({ type: String })
  discriminator: string;

  @Prop({ type: String })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
