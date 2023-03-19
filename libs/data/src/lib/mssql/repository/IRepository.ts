export interface IRepository<T> {
  getAll: () => Promise<T[]>;

  get: (id: string) => Promise<T | null>;

  create: (params: any) => Promise<T>;

  update: (id: string, params: any) => Promise<number>;
  
  delete: (id: string) => Promise<number>;
}