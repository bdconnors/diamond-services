import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Org } from './org.schema';
import { Role } from './role.schema';

export type SiteDocument = Document & Site;

@Schema({ timestamps: true, id: true })
export class Site {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Org' })
  org: Org;

  @Prop({ type: [Types.ObjectId], ref: 'Role' })
  roles:Role[];
}

export const SiteSchema = SchemaFactory.createForClass(Site);