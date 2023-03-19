export interface ICollection<T> {
  createOne: (data: Record<string, any>) => Promise<T>,
  createMany: (data: Record<string, any>[]) => Promise<T[]>,
  findAll: () => Promise<T[]>,
  findById: (id: string) => Promise<T>,
  findOne: (data: Record<string, any>) => Promise<T | null>,
  findManyById: (data: string[]) => Promise<T[]>,
  update: (id:string, data: Record<string, any>) => Promise<number>,
  delete: (id: string) => Promise<number>
}