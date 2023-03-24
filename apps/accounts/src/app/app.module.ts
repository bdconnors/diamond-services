
import { Module } from '@nestjs/common';
import { OrgModule } from './org/org.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './site/site.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrgModule,
    SiteModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})

export class AppModule {}