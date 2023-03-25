import { Controller, Get, Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { AddSiteDto } from './dto/add-site.dto';


@Controller('sites')
export class AppController {

  constructor(private readonly service: AppService){}

  @Get('/:id')
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
  }
}