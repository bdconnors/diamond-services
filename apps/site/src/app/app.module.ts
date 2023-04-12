import { OrgModule, PermissionModule, RoleModule, SiteModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';

import { AppController } from './app.controller';
import { clients } from './app.options';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
    ClientsModule.register(clients),
    SiteModule,
    RoleModule,
    PermissionModule,
    OrgModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    LoggerClient,
    AppService
  ],
})
export class AppModule {}
