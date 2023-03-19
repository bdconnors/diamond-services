export interface IMongoService<T> {
  add: (data: any) => Promise<T>,
  getById: (id: string) => Promise<T>,
  getAll: () => Promise<T[]>,
  update: (id: string, data: any) => Promise<number> 
  delete: (id: string)=>Promise<number>,
  make: (data: any) => Promise<T>,
  makeMany:(data: any[]) => Promise<T[]> 
}