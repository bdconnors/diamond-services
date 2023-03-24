import { FilterQuery, UpdateWriteOpResult } from "mongoose";

export interface IMongoCollection<T, K> {
  create: (data: K) => Promise<T>,
  createMany: (data: K[]) => Promise<T[]>,
  filter: (filter: FilterQuery<T>) => Promise<T[]>,
  findAll: () => Promise<T[]>,
  findById: (id: string) => Promise<T>,
  findManyById: (data: string[]) => Promise<T[]>,
  update: (filter: FilterQuery<T>) => Promise<UpdateWriteOpResult>
  updateById: (id:string, data: K) => Promise<T>,
  delete: (filter: FilterQuery<T>) => void,
  deleteById: (id: string) => void
}