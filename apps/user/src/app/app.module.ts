import { EncryptionModule } from '@diamond/encryption';
import { AccountsModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([{ 
      name: `AUTH_SERVICE`, 
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMPQ_URL],
        queue: `AUTH_QUEUE`,
        queueOptions: {
          durable: false
        }
      }
    }]),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
    EncryptionModule,
    AccountsModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
