import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Body, Param} from '@nestjs/common/decorators';
import { AddOrgDto } from './dto/add-org.dto';
import { OrgService } from './org.service';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';
import { User, UserGuard } from '../auth/guard/user.guard';
import { OrgRole, OrgRoleGuard } from '../auth/guard/org-role.guard';

@Controller('orgs')
export class OrgController {

  constructor(
    private readonly service: OrgService,
    private readonly logger: LoggerClient,
  ){}

  @OrgRole('ADMIN', 'CONTRIBUTOR', 'READER')
  @UseGuards(OrgRoleGuard)
  @Get()
  async list() {
    const orgs = await this.service.getAll();
    this.logger.info('GET', 'READ', 'list orgs request',orgs );
    return orgs;
  }

  @OrgRole('ADMIN', 'CONTRIBUTOR')
  @UseGuards(OrgRoleGuard)
  @Post('/create')
  async create(@Body() body: AddOrgDto) {
    const org = await this.service.add(body.name);
    this.logger.info('POST', 'CREATE', 'create org request', org);
    return org;
  }

  @OrgRole('ADMIN', 'CONTRIBUTOR', 'READER')
  @UseGuards(OrgRoleGuard)
  @Get(':id')
  async find(@Param('id') id: string) {
    const org = await this.service.get(id);
    this.logger.info('GET', 'READ', 'get org request', org);
    return org;
  }

  @OrgRole('ADMIN', 'CONTRIBUTOR', 'READER')
  @UseGuards(OrgRoleGuard)
  @Get(':id/sites')
  async getSites(@Param('id') id: string) {
    const sites = await this.service.getSites(id);
    this.logger.info('GET', 'READ', 'get org sites request', sites);
    return sites;
  }
  
  @OrgRole('ADMIN', 'CONTRIBUTOR', 'READER')
  @UseGuards(OrgRoleGuard)
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