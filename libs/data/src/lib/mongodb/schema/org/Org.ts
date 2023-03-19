import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

export type OrgDocument = Document & Org;

@Schema()
export class Org {
  @Prop({ required: true })
  name: string;
}

export const OrgSchema = SchemaFactory.createForClass(Org);