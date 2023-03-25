import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrgDocument = Document & Org;

@Schema({ timestamps: true, id: true })
export class Org {

  @Prop({ required: true })
  name: string;
}

export const OrgSchema = SchemaFactory.createForClass(Org);