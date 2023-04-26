import { OrgModule, SiteModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';
import { SiteController } from './site.controller';
import { SiteService } from './site.service';

@Module({
  imports: [
    SiteModule,
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
