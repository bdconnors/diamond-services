
import { Module } from '@nestjs/common';
import { SiteController } from './site.controller';
import { DatabaseModule } from '../core/database/database.module';
import { SiteService } from './site.service';

@Module({
  imports: [
    DatabaseModule
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