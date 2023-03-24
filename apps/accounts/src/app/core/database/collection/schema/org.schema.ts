import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, ObjectId, Types } from 'mongoose';
import { Site } from './site.schema';
import { User } from './user.schema';

export type OrgDocument = Document & Org;

@Schema({ timestamps: true, id: true })
export class Org {

  @Prop({ required: true })
  name: string;
}

export const OrgSchema = SchemaFactory.createForClass(Org);