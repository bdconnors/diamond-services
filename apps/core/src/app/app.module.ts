import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthServiceModule } from './auth/auth.module';
import { OrgServiceModule } from './org/org.module';
import { SiteServiceModule } from './site/site.module';
import { UserServiceModule } from './user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
    AuthServiceModule,
    UserServiceModule,
    OrgServiceModule,
    SiteServiceModule
  ]
})
export class AppModule {}
