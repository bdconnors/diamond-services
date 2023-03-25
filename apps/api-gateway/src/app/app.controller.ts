import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { PayloadDto } from './dto/payload.dto';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('/orgs/:cmd')
  async orgs(@Param('cmd') cmd: string, @Body() data?: PayloadDto) {
    return await this.service.orgMessage(cmd, data);
  }

  @Post('/sites/:cmd')
  async sites(@Param('cmd') cmd: string, @Body() data?: PayloadDto) {
    return await this.service.siteMessage(cmd, data);
  }

  
  @Post('/users/:cmd')
  async users(@Param('cmd') cmd: string, @Body() data?: PayloadDto) {
    return await this.service.userMessage(cmd, data);
  }
}
