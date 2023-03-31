import { Controller, Get, Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AddSiteDto } from './dto/add-site.dto';


@Controller('sites')
export class AppController {

  constructor(private readonly service: AppService){}
  
  @MessagePattern('list')
  list(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data);
    return this.service.getAll();
  }
  @MessagePattern('find')
  find(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data);
    return this.service.get(data.id);
  }
  @MessagePattern('findRole')
  findRole(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log(data);
    return this.service.get(data.id);
  }
  /**@Get('/:id')
  async getSite(@Param('id') id: string) {
    return await this.service.get(id);
  }

  @Get()
  async listSites() {
    return await this.service.getAll();
  }

  @Post()
  async addSite(@Body() dto: AddSiteDto){
    return await this.service.add(dto.orgId, dto.name);
  }**/
}