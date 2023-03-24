import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCollection } from './base/MongoCollection';
import { Site, SiteDocument } from './schema/site.schema';

@Injectable()
export class  SiteCollection extends MongoCollection<SiteDocument, Site> {
  constructor(@InjectModel(Site.name) protected model: Model<SiteDocument>){
    super(model);
  }
}