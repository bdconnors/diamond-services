import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoCollection } from './base/MongoCollection';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserCollection extends MongoCollection<UserDocument, User> {
  constructor(@InjectModel(User.name) protected model: Model<UserDocument>){
    super(model);
  }
  /**constructor(
    @InjectModel(User.name) protected readonly model: Model<User>,
    protected readonly bcrypt: BCryptService
  ) {
    super(model)
  }

  async createOne(data: Record<string, any>){
    data.password = this.bcrypt.hash(data.password);
    return super.createOne(data);
  }
  
  async createMany(data: Record<string, any>[]) {
    let current: Record<string, any>;
    for(let i = 0 ; i < data.length; i++) {
      current = data[i];
      current.password = this.bcrypt.hash(current.password);
    }
    return await this.model.create(data);
  }**/
}