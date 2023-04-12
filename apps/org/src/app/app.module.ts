import { OrgModule, UserModule } from '@diamond/mongo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';
import { clients } from './app.options';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONN),
    ClientsModule.register(clients),
    OrgModule,
    UserModule
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
