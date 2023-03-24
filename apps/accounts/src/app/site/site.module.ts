
import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { AccountsModule } from '../module/mongo/accounts/accounts.module';
import { SiteService } from './site.service';
import { AccountsContext } from '../module/mongo/accounts/accounts.context';

@Module({
  imports: [
    AccountsModule
  ],
  controllers: [
    SiteController
  ],
  providers: [
    SiteService
  ],
  exports:[
    SiteService
  ]
})

export class SiteModule {}