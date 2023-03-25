import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { LoginReqDto } from './dto/login.dto';
import { VerifyReqDto } from './dto/verify.dto';

@Controller('jwt')
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
}
