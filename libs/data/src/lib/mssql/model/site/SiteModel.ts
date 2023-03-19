import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class SiteModel extends Model {
  @Column
  id: number;

  @Column
  orgId: number;

  @Column
  name: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}