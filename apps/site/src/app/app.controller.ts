import { Controller, Get, Post } from '@nestjs/common';
import { Body, Inject, Param } from '@nestjs/common/decorators';
import { ClientRMQ, Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AddSiteDto } from './dto/add-site.dto';


@Controller('sites')
export class AppController {

  constructor(
    private readonly service: AppService,
    @Inject('LOGGER_SERVICE') private logger: ClientRMQ
  ){}

  @Get('/:id')
  async getSite(@Param('id') id: string) {
    const site = await this.service.get(id);
    this.logger.emit('info', { method:'GET', action:'READ', description: 'get site request', data: site });
    return site;
  }

  @Get()
  async listSites() {
    const sites = await this.service.getAll();
    this.logger.emit('info', { method:'GET', action:'READ', description: 'get all sites request', data: sites });
    return sites;
  }

  @Post()
  async addSite(@Body() dto: AddSiteDto){
    const site = await this.service.add(dto.orgId, dto.name);
    this.logger.emit('info', { method:'POST', action:'CREATE', description: 'create site request', data: site });
    return site;
  }

  @MessagePattern('list')
  async list(@Payload() data: any) {
    const sites = await this.service.getAll();
    this.logger.emit('info', { method:'MSG', action:'READ', description: 'get all sites message', data: sites });
    return sites;
  }
  
  @MessagePattern('find')
  async find(@Payload() data: any) {
    const site = await this.service.get(data.id);
    this.logger.emit('info', { method:'MSG', action:'READ', description: 'get site message', data: site });
    return site;
  }

  @MessagePattern('findRole')
  async findRole(@Payload() data: any) {
    const role = await this.service.get(data.id);
    this.logger.emit('info', { method:'MSG', action:'READ', description: 'get role message', data: role });
    return role;
  }
}