import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Permission } from '../permission/permission.schema';

export type RoleDocument = Document & Role;

@Schema({ timestamps: true, id: true })
export class Role {

  @Prop({ required: true, unique: true})
  title: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Permission' })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);