
import { Module } from '@nestjs/common';
import { AccountsContext } from '../module/mongo/accounts/accounts.context';
import { AccountsModule } from '../module/mongo/accounts/accounts.module';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';

@Module({
  imports: [
    AccountsModule
  ],
  controllers: [
    OrgController
  ],
  providers: [
    OrgService
  ],
  exports:[
    OrgService
  ]
})

export class OrgModule {}