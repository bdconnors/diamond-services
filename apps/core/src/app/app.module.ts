import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { OrgServiceModule } from './org/org.module';
import { SiteServiceModule } from './site/site.module';
import { UserServiceModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
    UserServiceModule,
    OrgServiceModule,
    SiteServiceModule
  ]
})
export class AppModule {}
