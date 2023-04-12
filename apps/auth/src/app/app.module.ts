import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EncryptionModule } from '@diamond/encryption';
import { ClientsModule } from '@nestjs/microservices';
import { clients } from './app.options';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EncryptionModule,
    ClientsModule.register(clients),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
