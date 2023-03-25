
import { Module } from '@nestjs/common';
import { OrgModule } from './org/org.module';
import { ConfigModule } from '@nestjs/config';
import { SiteModule } from './site/site.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
    OrgModule,
    SiteModule,
    UserModule
  ],
  controllers: [],
  providers: [],
  exports:[]
})

export class AppModule {}