import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService){}
  
  @Post()
  async addUser(@Body() dto: AddUserDto) {
    return await this.service.add(dto.orgId, dto.firstName, dto.lastName, dto.email, dto.password);
  }

  @Get()
  async getAllUsers() {
    return await this.service.getAll();
  }
}