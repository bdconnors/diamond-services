import { Controller, Get } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @MessagePattern('warn')
  async warn(@Payload() data:  { method:string, description: string, data:any }, @Ctx() context: RmqContext) {
    this.service.warn(data);
  }
  @MessagePattern('error')
  async error(@Payload() data:  { method:string, description: string, data:any }, @Ctx() context: RmqContext) {
    this.service.warn(data);
  }
  @MessagePattern('info')
  async info(@Payload() data:  { method:string, description: string, data:any }, @Ctx() context: RmqContext) {
    this.service.log(data);
  }
  @MessagePattern('debug')
  async debug(@Payload() data:  { method:string, description: string, data:any }, @Ctx() context: RmqContext) {
    this.service.debug(data);
  }
}

