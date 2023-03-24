import { Controller, Get, Post } from '@nestjs/common';
import { Body, Delete, Param, Put } from '@nestjs/common/decorators';
import { AddOrgDto } from './dto/add-org.dto';
import { UpdateOrgDto } from './dto/update-org.dto';
import { OrgService } from './org.service';


@Controller('orgs')
export class OrgController {

  constructor(private readonly service: OrgService){}

  @Get()
  async listOrgs(){
    return await this.service.getAll();
  }

  @Get('/:id')
  async getOrg(@Param('id') id: string){
    return await this.service.get(id);
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
  }
}