import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppFactory } from './app.factory';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppFactory, AppService],
})
export class AppModule {}
