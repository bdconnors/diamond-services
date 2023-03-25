import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCollection } from '../../MongoCollection';
import { Org, OrgDocument } from '../schema/org.schema';

@Injectable()
export class OrgCollection extends MongoCollection<OrgDocument, Org> {
  constructor(@InjectModel(Org.name) protected model: Model<OrgDocument>){
    super(model);
  }
}