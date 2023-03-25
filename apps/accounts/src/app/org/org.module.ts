
import { AccountsModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
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