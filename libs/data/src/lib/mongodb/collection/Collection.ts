import { Model } from 'mongoose';
import { ICollection } from './ICollection';

export class Collection<T> implements ICollection<T> {
  constructor(protected readonly model: Model<T>) {}

  async createOne(data: Record<string, any>) { 
    return await this.model.create(data);
  }

  async createMany(data: Record<string, any>[]) {
    return await this.model.create(data);
  }

  async findAll() {
    return await this.model.find({});
  }

  async findById(id: string) {
    try {
      const site = await this.model.findById(id);
      if (!site) {
        throw new Error(`${id} not found`);
      }
      return site;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(data: Record<string, any>) {
    return await this.model.findOne(data);
  }

  async findManyById(values: string[]) {
    // Use the $in operator to find multiple documents by id
    return await this.model.find({ _id: { $in: values } }).exec();
  }

  async update(id: string, data: Record<string, any>) {

    return await (await this.model.updateOne({ _id: id }, data)).modifiedCount;

  }

  async delete(id: string) {
    return await (await this.model.deleteOne({ _id: id })).deletedCount;
  }
}