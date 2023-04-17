import { OrgModule, PermissionModule, RoleModule, SiteModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';
import { OrgServiceModule } from '../org/org.module';

import { SiteController } from './site.controller';
import { SiteService } from './site.service';

@Module({
  imports: [
    SiteModule,
    RoleModule,
    PermissionModule,
    OrgModule,
    ClientsModule.register([
      { 
        name: `LOGGER_SERVICE`, 
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: `LOGGER_QUEUE`,
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  controllers: [
    SiteController
  ],
  providers: [
    LoggerClient,
    SiteService
  ],
  exports: [
    SiteService
  ]
})
export class SiteServiceModule {}
