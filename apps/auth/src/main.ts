/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  /**const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3334;
  await app.listen(port);
  Logger.log(
    `🚀 JWT Service Running on http://127.0.0.1:${port}`
  );**/
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'AUTH_QUEUE',
        queueOptions: {
          durable: false
        },
      },
    }
  );
  await app.listen();
}

bootstrap();