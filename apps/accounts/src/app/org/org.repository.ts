import { Injectable } from '@nestjs/common';
import { Repository, OrgModel } from '@diamond/data';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class OrgRepository extends Repository<OrgModel> {
  constructor(protected connection: Sequelize) {
    super(connection, 'ORG');
  }
}