import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Org } from '../org/org.schema';
import { Role } from '../role/role.schema';
import { Site } from '../site/site.schema';

export type RoleType = 'ADMIN' | 'CONTRIBUTOR' | 'READER';
export type UserType = 'ADMIN' | 'STANDARD';

@Schema()
export class OrgRole {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  role: RoleType;
}

@Schema()
export class SiteRole {
  
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  role: RoleType;
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

  @Prop({ required: true })
  type: UserType;

  @Prop({ required: true })
  orgRole: OrgRole;
  
  @Prop()
  siteRoles: SiteRole[];

}
export const UserSchema = SchemaFactory.createForClass(User);