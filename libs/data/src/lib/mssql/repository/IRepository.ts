export interface IRepository<T> {
  getAll: () => Promise<T[]>;

  get: (id: string) => Promise<T | null>;

  create: (params: Record<string, string>) => Promise<T>;

  update: (id: string, params: Record<string, string>) => Promise<number>;
  
  delete: (id: string) => Promise<number>;
}