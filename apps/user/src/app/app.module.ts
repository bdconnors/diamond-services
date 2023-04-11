import { EncryptionModule } from '@diamond/encryption';
import { AccountsModule, OrgModule, RoleModule, UserModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register(
      [
        { 
          name: `ORG_SERVICE`, 
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: `ORG_QUEUE`,
            queueOptions: {
              durable: false
            }
          }
        },
        { 
          name: `SITE_SERVICE`, 
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMPQ_URL],
            queue: `SITE_QUEUE`,
            queueOptions: {
              durable: false
            }
          }
        },
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
      ]
    ),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
    EncryptionModule,
    UserModule,
    OrgModule,
    RoleModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
