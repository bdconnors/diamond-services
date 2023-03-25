
import { AccountsModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';

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