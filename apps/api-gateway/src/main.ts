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

  const ORG_SERVICE_URL = process.env.ORG_URL || "http://127.0.0.1:3331";
  const SITE_SERVICE_URL = process.env.SITE_URL || "http://127.0.0.1:3332";
  const USER_SERVICE_URL = process.env.USER_URL || "http://127.0.0.1:3333";
  // Proxy endpoints
  app.use('/api/orgs', createProxyMiddleware({
    target: ORG_SERVICE_URL,
    changeOrigin: true,
  }));

  app.use('/api/sites', createProxyMiddleware({
    target: SITE_SERVICE_URL,
    changeOrigin: true,
  }));

  app.use('/api/users', createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
  }));

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();