import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from '../role';

export type OrgDocument = Document & Org;

@Schema({ timestamps: true, id: true })
export class Org {

  @Prop({ required: true })
  name: string;

  @Prop({ type: [Types.ObjectId], ref: 'Role' })
  roles:Role[];
}

export const OrgSchema = SchemaFactory.createForClass(Org);