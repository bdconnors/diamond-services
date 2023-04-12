import { Controller, Get, Post } from '@nestjs/common';
import { Body, Param} from '@nestjs/common/decorators';
import { AddOrgDto } from './dto/add-org.dto';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';

@Controller('orgs')
export class AppController {

  constructor(
    private readonly service: AppService,
    private readonly logger: LoggerClient,
  ){}

  @Get()
  async list() {
    const orgs = await this.service.getAll();
    this.logger.info('GET', 'READ', 'list orgs request',orgs );
    return orgs;
  }

  @Post('/create')
  async create(@Body() body: AddOrgDto) {
    const org = await this.service.add(body.name);
    this.logger.info('POST', 'CREATE', 'create org request', org);
    return org;
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const org = await this.service.get(id);
    this.logger.info('GET', 'READ', 'get org request', org);
    return org;
  }

  @MessagePattern('get')
  async get(@Payload() data: any) {
    const org = await this.service.get(data.id);
    this.logger.info('GET', 'READ', 'get org request',org);
    return org;
  }
}