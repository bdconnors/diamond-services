import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type PermissionDocument = Document & Permission;

@Schema({ timestamps: true, id: true })
export class Permission {

  @Prop({ required: true, unique: true})
  title: string;

  @Prop({ required: true })
  label: string;

  @Prop({ required: true })
  description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);