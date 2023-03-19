import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserRepository } from './user.repository';

@Controller('/users')
export class UserController {
  constructor(private repo: UserRepository) {}
  @Get()
  async list() {
    return await this.repo.getAll();
  }
  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.repo.create(data)
  }
}