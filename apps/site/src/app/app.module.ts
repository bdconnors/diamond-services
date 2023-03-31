import { AccountsModule, OrgModule, PermissionCollection, PermissionModule, RoleCollection, RoleModule, SiteCollection, SiteModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
    SiteModule,
    RoleModule,
    PermissionModule,
    OrgModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
