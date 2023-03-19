import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class PermissionModel extends Model {
  @Column
  id: number;

  @Column({ unique: true })
  title: string;

  @Column
  label: string;

  @Column
  description: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}