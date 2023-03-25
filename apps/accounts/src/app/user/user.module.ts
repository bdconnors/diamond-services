
import { Module } from '@nestjs/common';
import { EncryptionModule } from '@diamond/encryption';
import { AccountsModule } from '@diamond/mongo';
import { UserController } from './user.controller';
import { UserService } from './user.service';


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