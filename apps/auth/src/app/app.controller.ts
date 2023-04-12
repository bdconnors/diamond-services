import { Body, Controller, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { LoginReqDto } from './dto/login.dto';
import { VerifyReqDto } from './dto/verify.dto';

@Controller('auth')
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('/login') 
  async login(@Body() dto: LoginReqDto ){
    const token = await this.service.login(dto.email, dto.password);
    return { token: token };
  }
  
  @Post('/verify') 
  async verify(@Body() dto: VerifyReqDto ){
    const data = await this.service.decode(dto.token);
    return { data: data };
  }

  @MessagePattern('login')
  async loginMsg(@Payload() data: any) {
    const result = await this.service.login(data.email, data.password);
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
