import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { LogEventDto } from './dto/log-event.dto';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @MessagePattern('warn')
  async warn(@Payload() data: LogEventDto) {
    this.service.warn(data);
  }
  @MessagePattern('error')
  async error(@Payload() data: LogEventDto) {
    this.service.warn(data);
  }
  @MessagePattern('info')
  async info(@Payload() data: LogEventDto) {
    this.service.log(data);
  }
  @MessagePattern('debug')
  async debug(@Payload() data: LogEventDto) {
    this.service.debug(data);
  }
}

