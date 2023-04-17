import { Controller, Get, Post } from '@nestjs/common';
import { Body, Param} from '@nestjs/common/decorators';
import { AddOrgDto } from './dto/add-org.dto';
import { OrgService } from './org.service';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';

@Controller('orgs')
export class OrgController {

  constructor(
    private readonly service: OrgService,
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

  @Get(':id/sites')
  async getSites(@Param('id') id: string) {
    const sites = await this.service.getSites(id);
    this.logger.info('GET', 'READ', 'get org sites request', sites);
    return sites;
  }

  @Get(':id/users')
  async getUsers(@Param('id') id: string) {
    const users = await this.service.getUsers(id);
    this.logger.info('GET', 'READ', 'get org users request', users);
    return users;
  }

  /**@MessagePattern('get')
  async get(@Payload() data: any) {
    const org = await this.service.get(data.id);
    this.logger.info('GET', 'READ', 'get org request',org);
    return org;
  }**/
}