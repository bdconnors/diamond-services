/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {createProxyMiddleware} from 'http-proxy-middleware';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3330;
  const CONTENT_SERVICE_URL = process.env.CONTENT_URL || "http://localhost:3331";
  console.log(CONTENT_SERVICE_URL);
  // Proxy endpoints
  app.use('/api/content', createProxyMiddleware({
    target: CONTENT_SERVICE_URL,
    changeOrigin: true,
  }));
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();