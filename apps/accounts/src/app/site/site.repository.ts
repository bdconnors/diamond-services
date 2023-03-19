import { Injectable } from '@nestjs/common';
import { Repository, SiteModel } from '@diamond/data';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SiteRepository extends Repository<SiteModel> {
  constructor(protected connection: Sequelize) {
    super(connection, 'SITE');
  }
}