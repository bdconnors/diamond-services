
import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserModel } from '@diamond/data';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { BCryptModule } from '@diamond/modules';
@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    BCryptModule
  ],
  controllers:[UserController],
  providers: [UserRepository],
  exports:[UserRepository]
})
export class UserModule {}