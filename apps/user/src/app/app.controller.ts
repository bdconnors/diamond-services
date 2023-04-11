import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { AppService } from './app.service';
import { ClientRMQ, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class AppController {

  constructor(
    private readonly service: AppService,
    @Inject('LOGGER_SERVICE') private logger: ClientRMQ,
  ){}

  @Post()
  async addUser(@Body() dto: AddUserDto) {
    const user = await this.service.add(dto.orgId, dto.firstName, dto.lastName, dto.email, dto.password);
    this.logger.emit('info', { method:'POST', action:'CREATE', description: 'create user request', data: user});
    return user;
  }

  @Get('/:email')
  async get(@Param('email') email: string) {
    const user = await this.service.getByEmail(email);
    this.logger.emit('info', { method:'GET', action:'READ', description: 'get user request', data: user});
    return user;
  }

  @Get()
  async getAllUsers() {
    const users = await this.service.getAll();
    this.logger.emit('info', { method:'GET', action:'READ', description: 'get all users request', data: users});
    return users;
  }

  @MessagePattern('list')
  async list(@Payload() data: any) {
    const users = await this.service.getAll();
    this.logger.emit('info', { method:'MSG', action:'READ', description: 'list users message', data: users});
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
    this.logger.emit('info', { method:'MSG', action:'CREATE', description: 'create user message', data: user});
    return user;
  }
  
  @MessagePattern('byOrgId')
  async getByOrgId(@Payload() data: any) {
    const users = await this.service.getOrgUsers(data.id);
    this.logger.emit('info', { method:'MSG', action:'GET', description: 'get org users message', data: users});
    return users;
  }
}