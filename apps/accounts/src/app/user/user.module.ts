
import { Module } from '@nestjs/common';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccountsModule } from '../module/mongo/accounts/accounts.module';
import { EncryptionModule } from '../module/encryption/encryption.module';

@Module({
  imports: [
    EncryptionModule,
    AccountsModule
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