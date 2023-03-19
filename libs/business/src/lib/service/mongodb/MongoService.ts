import { Injectable } from '@nestjs/common';
import { IMongoService } from '@diamond/business';
import { MongoCollection } from '@diamond/data';

@Injectable()
export abstract class MongoService<T, K> implements IMongoService<T> {
  constructor(protected collection: MongoCollection<K>) {}

  async add(data: any): Promise<T> {
    const doc = await this.collection.createOne(data);
    const result: T = await this.getById(doc.id);
    return result;
  }

  async getById(id: string): Promise<T> {
    const doc: K = await this.collection.findById(id)
    return await this.make(doc); 
  }

  async getAll(): Promise<T[]> {
    const docs = await this.collection.findAll();
    return await this.makeMany(docs);
  }

  async update(id: string, data: any): Promise<number> {
    return await this.collection.update(id, data);  
  }

  async delete(id: string): Promise<number> {
    return await this.collection.delete(id); 
  }

  abstract make(data: any): Promise<T> 

  async makeMany(data: any[]): Promise<T[]> {
    let results: T[] = [];
    let curData: Record<string, any>;
    let model: T;

    for(let i = 0; i < data.length; i++) {
      curData = data[i];
      model = await this.make(curData);
      results.push(model);
    }

    return results;
  }
}