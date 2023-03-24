import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCollection } from '../../MongoCollection';
import { Role, RoleDocument } from '../schema/role.schema';


@Injectable()
export class RoleCollection extends MongoCollection<RoleDocument, Role> {
  constructor(@InjectModel(Role.name) protected model: Model<RoleDocument>){
    super(model);
  }
}