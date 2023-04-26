import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Org } from '../org/org.schema';

export type SiteDocument = Document & Site;

@Schema({ timestamps: true, id: true })
export class Site {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Org' })
  org: Org;
}

export const SiteSchema = SchemaFactory.createForClass(Site);