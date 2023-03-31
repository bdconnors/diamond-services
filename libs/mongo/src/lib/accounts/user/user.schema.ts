import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Org } from '../org/org.schema';
import { Role } from '../role/role.schema';
import { Site } from '../site/site.schema';


@Schema()
export class SiteRole {
  
  @Prop({ type: Types.ObjectId, ref: 'Site' })
  site: Site;

  @Prop({ type: Types.ObjectId, ref: 'Role' })
  role: Role;
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

  @Prop({ default: false })
  verified: boolean;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Org' })
  org: Org;
  
  @Prop()
  roles: SiteRole[];

}
export const UserSchema = SchemaFactory.createForClass(User);