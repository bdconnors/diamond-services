import { Controller, Get, Post } from '@nestjs/common';
import { Body, Inject, Param} from '@nestjs/common/decorators';
import { AddOrgDto } from './dto/add-org.dto';
import { AppService } from './app.service';
import { ClientRMQ, MessagePattern, Payload } from '@nestjs/microservices';


@Controller('orgs')
export class AppController {

  constructor(
    private readonly service: AppService,
    @Inject('LOGGER_SERVICE') private logger: ClientRMQ,
  ){}

  @Get()
  async list() {
    const orgs = await this.service.getAll();
    this.logger.emit('info', { method:'GET', action:'READ', description: 'list orgs request', data: orgs });
    return orgs;
  }

  @Post('/create')
  async create(@Body() body: AddOrgDto) {
    const org = await this.service.add(body.name);
    this.logger.emit('info', { method:'POST', action:'CREATE', description: 'create org request', data: org });
    return org;
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const org = await this.service.get(id);
    this.logger.emit('info', { method:'GET', action:'READ', description: 'get org request', data: org });
    return org;
  }

  @MessagePattern('get')
  async get(@Payload() data: any) {
    const org = await this.service.get(data.id);
    this.logger.emit('info', { method:'GET', action:'READ', description: 'get org request', data: org });
    return org;
  }
}