import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type SiteDocument = Document & Site;

@Schema()
export class Site {
  @Prop({ required: true })
  orgId: ObjectId;

  @Prop({ required: true })
  name: string;
}

export const SiteSchema = SchemaFactory.createForClass(Site);