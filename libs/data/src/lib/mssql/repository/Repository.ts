import { Injectable } from "@nestjs/common";
import { IRepository } from "./IRepository";
import {  Sequelize } from 'sequelize-typescript';
import { QueryTypes } from "sequelize";

@Injectable()
export abstract class Repository<T> implements IRepository<T> {

  constructor(protected connection: Sequelize, protected table: string) {}


  async getAll(): Promise<T[]> {
    const procedure = `EXEC GET_ALL_${this.table}`;
    const options = { type: QueryTypes.SELECT };
    const rows = await this.connection.query(procedure, options);
    return rows as T[];
  }

  async get(id: string): Promise<T> {
    const procedure = `EXEC GET_${this.table}_BY_ID :id`;
    const options = { replacements: { id: id }, type: QueryTypes.SELECT };
    const rows = await this.connection.query(procedure, options)
  
    return rows[0] as T;
  }

  async create(params: Record<string, string>): Promise<T> {
    const procedure = this.buildQuery(`EXEC CREATE_${this.table} `, params);
    const options = { replacements: params, type: QueryTypes.INSERT };
    const cursor = await this.connection.query(procedure, options);
    return cursor[0][0] as T;
  }

  async update(id: string, params: Record<string, string>): Promise<number> {
    const procedure = this.buildQuery(`EXEC UPDATE_${this.table} `, params);
    const options = { replacements: params, type: QueryTypes.UPDATE };
    const cursor = await this.connection.query(procedure, options);
    return cursor[0].length;
  }
  async delete(id: string): Promise<number> {
    const params = { id: id };
    const procedure = this.buildQuery(`EXEC DELETE_${this.table} :id`, { id: id });
    const options = { replacements: params, type: QueryTypes.UPDATE };
    const cursor = await this.connection.query(procedure, options);
    return cursor[0].length;
  }

  buildQuery(query: string, params: Record<string, string>): string {
    let result = query;
    
    const props = Object.keys(params);
    props.forEach((prop: string, i: number)=>{
      result += `:${prop}`;
      if(i !== props.length - 1) { result += ', ';}
    });

    return result;
  }

}