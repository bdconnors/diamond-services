import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, Types } from 'mongoose';
import { Org } from './org.schema';
import { Role } from './role.schema';

export type UserDocument = Document & User;

@Schema({ timestamps: true, id: true })
export class User {

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Org' })
  org: Org;
  
  @Prop({ type: [Types.ObjectId], ref: 'Role' })
  roles: Role[];

}

export const UserSchema = SchemaFactory.createForClass(User);