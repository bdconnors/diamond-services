import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class UserModel extends Model {
  @Column
  id: number;

  @Column
  orgId: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}