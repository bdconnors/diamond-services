import { OrgModule, RoleModule, SiteModule, UserModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { LoggerClient } from '@diamond/clients';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    OrgModule,
    UserModule,
    SiteModule,
    RoleModule,
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
    OrgController
  ],
  providers: [
    LoggerClient,
    OrgService
  ],
  exports: [
    OrgService
  ]
})
export class OrgServiceModule {}
