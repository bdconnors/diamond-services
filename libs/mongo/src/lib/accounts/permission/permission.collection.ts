import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCollection } from '../../MongoCollection';
import { Permission, PermissionDocument } from './permission.schema';

@Injectable()
export class PermissionCollection extends MongoCollection<PermissionDocument, Permission> {
  constructor(@InjectModel(Permission.name) protected model: Model<PermissionDocument>){
    super(model);
  }
}