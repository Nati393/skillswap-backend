import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, unique: true })
  username!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop()
  bio?: string;

  @Prop()
  profilePicture?: string;

  @Prop()
  city?: string;

  @Prop({ default: 2 })
  timeBalance!: number;

  @Prop({ default: 0 })
  averageRating!: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Skill' }], default: [] })
  skills!: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  following!: Types.ObjectId[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  followers!: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);