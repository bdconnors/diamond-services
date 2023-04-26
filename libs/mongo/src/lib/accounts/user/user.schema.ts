import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserRole = 'ADMIN' | 'CONTRIBUTOR' | 'READER';


@Schema()
export class SiteRole {
  
  @Prop({ required: true })
  siteId: string;

  @Prop({ required: true })
  role: UserRole;
}

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

  @Prop()
  mobileNumber?: string;
  
  @Prop({ type: [Types.ObjectId], ref: 'Org' })
  orgId: string;

  @Prop({ required: true })
  orgRole: UserRole;
  
  @Prop()
  siteRoles: SiteRole[];

}
export const UserSchema = SchemaFactory.createForClass(User);