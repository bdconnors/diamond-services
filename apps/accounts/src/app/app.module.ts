
import { Module } from '@nestjs/common';
import { OrgModule } from './org/org.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './site/site.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrgModule,
    SiteModule,
    UserModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})

export class AppModule {}