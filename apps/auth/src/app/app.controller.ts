import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly service: AppService) {}
  
  @MessagePattern('sign')
  async login(@Payload() data: any, @Ctx() context: RmqContext) {
    return this.service.sign(data);
  }

  @MessagePattern('verify')
  async verify(@Payload() data: any, @Ctx() context: RmqContext) {
    const result = await this.service.decode(data.token);
    return { data: result };
  }
  /**@Post('/login') 
  async login(@Body() dto: LoginReqDto ){
    const token = await this.service.login(dto.email, dto.password);
    return { token: token };
  }

  @Post('/verify') 
  async verify(@Body() dto: VerifyReqDto ){
    const data = await this.service.decode(dto.token);
    return { data: data };
  }**/
}
