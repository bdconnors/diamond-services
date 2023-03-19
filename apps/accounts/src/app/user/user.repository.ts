import { Injectable } from '@nestjs/common';
import { Repository, UserModel } from '@diamond/data';
import { Sequelize } from 'sequelize-typescript';
import { BCryptService } from '@diamond/modules';
import { CreateUserDto } from './dto/create-user-dto';

@Injectable()
export class UserRepository extends Repository<UserModel> {
  constructor(protected connection: Sequelize, protected bcrypt: BCryptService) {
    super(connection, 'USER');
  }
  async create(params: CreateUserDto) {
    const hashedPassword = await this.bcrypt.hash(params.password);
    params.password = hashedPassword;
    return await super.create(params);
  }
}