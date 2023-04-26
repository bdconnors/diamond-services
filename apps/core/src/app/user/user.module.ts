import { EncryptionModule } from '@diamond/encryption';
import { OrgModule, SiteModule, UserModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    EncryptionModule,
    UserModule,
    OrgModule,
    SiteModule,
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
    UserController
  ],
  providers: [
    LoggerClient,
    UserService
  ],
  exports: [
    UserService
  ]
})
export class UserServiceModule {}
