import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class OrgModel extends Model {
  @Column
  id: number;

  @Column
  name: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}