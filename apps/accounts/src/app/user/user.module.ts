
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database/database.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService
  ],
  exports:[
    UserService
  ]
})

export class UserModule {}