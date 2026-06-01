import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ExchangeDocument = Exchange & Document;

@Schema({ timestamps: true })
export class Exchange {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  requesterId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  receiverId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Skill', required: true })
  skillId: Types.ObjectId;

  @Prop({ required: true })
  hours: number;

  @Prop({ required: true })
  scheduledAt: Date;

  @Prop({ required: true, enum: ['inPerson', 'virtual'] })
  modality: string;

  @Prop()
  message: string;

  @Prop({
    default: 'pending',
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
  })
  status: string;
}

export const ExchangeSchema = SchemaFactory.createForClass(Exchange);