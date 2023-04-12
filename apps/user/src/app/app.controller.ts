import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';

@Controller('users')
export class AppController {

  constructor(
    private readonly service: AppService,
    private readonly logger: LoggerClient,
  ){}

  @Post()
  async addUser(@Body() dto: AddUserDto) {
    const user = await this.service.add(dto.orgId, dto.firstName, dto.lastName, dto.email, dto.password);
    this.logger.info('POST', 'CREATE', 'create user request', user);
    return user;
  }

  @Get('/:email')
  async get(@Param('email') email: string) {
    const user = await this.service.getByEmail(email);
    this.logger.info('GET', 'READ', 'get user request', user);
    return user;
  }

  @Get()
  async getAllUsers() {
    const users = await this.service.getAll();
    this.logger.info('GET', 'READ', 'get all users request', users);
    return users;
  }

  @MessagePattern('list')
  async list(@Payload() data: any) {
    const users = await this.service.getAll();
    this.logger.info('MSG', 'READ', 'list users message', users);
    return users;
  }

  @MessagePattern('register')
  async register(@Payload() data: AddUserDto) {
    const user = await this.service.add(
      data.orgId, 
      data.firstName, 
      data.lastName, 
      data.email, 
      data.password
    );
    this.logger.info('MSG', 'CREATE', 'create user message', user);
    return user;
  }
  
  @MessagePattern('byOrgId')
  async getByOrgId(@Payload() data: any) {
    const users = await this.service.getOrgUsers(data.id);
    this.logger.info('MSG','GET', 'get org users message', users);
    return users;
  }
}