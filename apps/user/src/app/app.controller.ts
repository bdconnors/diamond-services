import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AddRoleDto } from './dto/add-role.dto';
import { AddUserDto } from './dto/add-user.dto';
import { AppService } from './app.service';

@Controller('users')
export class AppController {

  constructor(private readonly service: AppService){}
  
  @Post()
  async addUser(@Body() dto: AddUserDto) {
    return await this.service.add(dto.orgId, dto.firstName, dto.lastName, dto.email, dto.password);
  }

  @Get()
  async getAllUsers() {
    return await this.service.getAll();
  }

  @Put('/:id/addRole')
  async addRole(@Param('id') id: string, @Body() dto: AddRoleDto) {
    return await this.service.addRole(id, dto.siteId, dto.roleId);
  }
}