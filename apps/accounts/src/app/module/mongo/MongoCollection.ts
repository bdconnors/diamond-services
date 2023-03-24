import { FilterQuery, Model } from 'mongoose';import { IMongoCollection } from './IMongoCollection';
;

export abstract class MongoCollection<T, K> implements IMongoCollection<T, K> {

  constructor(protected readonly model: Model<T>) {}

  create(data: K) { 
    return this.model.create(data);
  }

  createMany(data: K[]) {
    return this.model.create(data);
  }

  filter(filter: FilterQuery<T>) {
    return this.model.find(filter);
  }

  findAll() {
    return this.model.find();
  }

  findById(id: string) {
    return this.model.findById(id);
  }

  findManyById(values: string[]) {
    return this.model.find({ _id: { $in: values } });
  }

  async update(filter: FilterQuery<T>) {
    return await this.model.updateMany(filter);
  }

  async updateById(id: string, data: K) {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  deleteById(id: string) {
    this.model.findByIdAndDelete(id);
  }

  delete(filter: FilterQuery<T>) {
    this.model.deleteMany(filter);
  }
}