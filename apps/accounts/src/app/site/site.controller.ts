import { Controller, Get, Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { AddSiteDto } from './dto/add-site.dto';
import { SiteService } from './site.service';


@Controller('sites')
export class SiteController {

  constructor(private readonly service: SiteService){}

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