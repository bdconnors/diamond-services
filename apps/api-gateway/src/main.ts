/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {createProxyMiddleware} from 'http-proxy-middleware';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

class ServiceEndpoint {
  path: string;
  url: string;
}

const endpoints: ServiceEndpoint[] = [
  {
    path: '/api/orgs',
    url: `${process.env.SERVICE_HOST}:${process.env.ORG_PORT}`
  },
  {
    path: '/api/sites',
    url: `${process.env.SERVICE_HOST}:${process.env.SITE_PORT}`
  },
  {
    path: '/api/users',
    url: `${process.env.SERVICE_HOST}:${process.env.USER_PORT}`
  },
  {
    path: '/api/jwt',
    url: `${process.env.SERVICE_HOST}:${process.env.JWT_PORT}`
  }
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = process.env.PORT || 3330;

  //proxy endpoints
  /**endpoints.forEach((endpoint: ServiceEndpoint)=> {
    app.use(endpoint.path, createProxyMiddleware({
      target: endpoint.url,
      changeOrigin: true,
    }));
  });**/

  await app.listen(port);
  Logger.log(
    `🚀 Api Gateway is running on: http://127.0.0.1:${port}/${globalPrefix}`
  );
}
bootstrap();