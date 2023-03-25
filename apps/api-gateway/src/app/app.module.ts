import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getClientOptions } from './app.clients';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(getClientOptions())],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
