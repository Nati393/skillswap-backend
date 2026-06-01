import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId!: Types.ObjectId;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true, enum: ['offer', 'request'] })
  type!: string;

  @Prop({ required: true, enum: ['Music', 'Languages', 'Technology', 'Cooking', 'Art', 'Sports', 'Other'] })
  category!: string;

  @Prop({ required: true, enum: ['beginner', 'intermediate', 'advanced'] })
  experienceLevel!: string;

  @Prop({ default: true })
  isAvailable!: boolean;

  @Prop({ required: true, enum: ['hobby', 'professional'] })
  skillType!: string;

  @Prop()
  certificateUrl?: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);