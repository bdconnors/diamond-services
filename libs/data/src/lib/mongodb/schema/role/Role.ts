import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type RoleDocument = Document & Role;

@Schema()
export class Role {

  @Prop({ required: true })
  siteId: ObjectId;

  @Prop({ required: true, unique: true})
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);