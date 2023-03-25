import { Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Param, Put } from '@nestjs/common/decorators';
import { AddOrgDto } from './dto/add-org.dto';
import { UpdateOrgDto } from './dto/update-org.dto';
import { AppService } from './app.service';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';


@Controller('orgs')
export class AppController {

  constructor(private readonly service: AppService){}

  @MessagePattern('list')
  list(@Payload() data: object, @Ctx() context: RmqContext) {
    console.log(data);
    return this.service.getAll();
  }
  
  /**@Get()
  async listOrgs(){
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOrg(@Param('id') id: string){
    return await this.service.get(id);
  }

  @Get('/:id/users')
  async getUsers(@Param('id') id: string){
    return await this.service.getUsers(id);
  }

  @Post()
  async addOrg(@Body() dto: AddOrgDto){
    return await this.service.add(dto.name);
  }

  @Put('/:id')
  async updateOrg(@Param('id') id: string, @Body() dto: UpdateOrgDto){
    return await this.service.update(id, dto.name);
  }

  @Delete()
  async deleteOrg(@Param('id') id: string) {
    return await this.service.delete(id);
  }**/
}