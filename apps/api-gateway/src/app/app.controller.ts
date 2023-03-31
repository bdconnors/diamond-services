import { Body, Controller, Header, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('/orgs/:cmd')
  @Header('Accept', 'application/json')
  async orgs(@Param('cmd') cmd: string, @Body() data?: any) {
    console.log(data);
    return await this.service.orgMessage(cmd, data);
  }

  @Post('/sites/:cmd')
  @Header('Accept', 'application/json')
  async sites(@Param('cmd') cmd: string, @Body() data?: any) {
    return await this.service.siteMessage(cmd, data);
  }

  @Post('/users/:cmd')
  @Header('Accept', 'application/json')
  async users(@Param('cmd') cmd: string, @Body() data?: any) {
    return await this.service.userMessage(cmd, data);
  }

  @Post('/auth/:cmd')
  @Header('Accept', 'application/json')
  async auth(@Param('cmd') cmd: string, @Body() data?: any) {
    return await this.service.authMessage(cmd, data);
  }
}
