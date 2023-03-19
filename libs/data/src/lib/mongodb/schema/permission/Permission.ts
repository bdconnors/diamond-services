import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PermissionDocument = Document & Permission;

@Schema()
export class Permission {
  @Prop({ required: true, unique: true})
  title: string;

  @Prop({ required: true })
  description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);