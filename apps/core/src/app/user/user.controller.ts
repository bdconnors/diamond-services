import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';
import { OrgRole, OrgRoleGuard } from '../auth/guard/org-role.guard';

@Controller('users')
export class UserController {

  constructor(
    private readonly service: UserService,
    private readonly logger: LoggerClient,
  ){}

  @OrgRole('ADMIN')
  @UseGuards(OrgRoleGuard)
  @Post()
  async addUser(@Body() dto: AddUserDto) {
    console.log(dto);
    const user = await this.service.add(dto.firstName, dto.lastName, dto.email, dto.password, dto.type, dto.orgRole, dto.siteRoles);
    this.logger.info('POST', 'CREATE', 'create user request', user);
    return user;
  }

  @OrgRole('ADMIN', 'CONTRIBUTOR', 'READER')
  @UseGuards(OrgRoleGuard)
  @Get('/:email')
  async get(@Param('email') email: string) {
    const user = await this.service.getByEmail(email);
    this.logger.info('GET', 'READ', 'get user request', user);
    return user;
  }
  
  @OrgRole('ADMIN', 'CONTRIBUTOR', 'READER')
  @UseGuards(OrgRoleGuard)
  @Get()
  async getAllUsers() {
    const users = await this.service.getAll();
    this.logger.info('GET', 'READ', 'get all users request', users);
    return users;
  }

  /**@MessagePattern('list')
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

  @MessagePattern('find')
  async find(@Payload() data: any) {
    const user = await this.service.getByEmail(data.email);
    this.logger.info('MSG','GET', 'get user by email message', user);
    return user;
  }**/
}