
import { Module } from '@nestjs/common';
import { OrgController } from './org.controller';
import { DatabaseModule } from '../core/database/database.module';
import { OrgService } from './org.service';

@Module({
  imports: [
    DatabaseModule
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