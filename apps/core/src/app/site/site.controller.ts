import { Controller, Get, Post } from '@nestjs/common';
import { Body, Param, UseGuards } from '@nestjs/common/decorators';
import { SiteService } from './site.service';
import { AddSiteDto } from './dto/add-site.dto';
import { LoggerClient } from 'libs/clients/src/lib/LoggerClient';
import { SiteRole, SiteRoleGuard } from '../auth/guard/site-role.guard';

@Controller('sites')
export class SiteController {

  constructor(
    private readonly service: SiteService,
    private readonly logger: LoggerClient
  ){}

  @SiteRole('ADMIN', 'CONTRIBUTOR', 'READER')
  @UseGuards(SiteRoleGuard)
  @Get('/:siteId')
  async getSite(@Param('siteId') id: string) {
    const site = await this.service.get(id);
    this.logger.info('GET', 'READ', 'get site request', site);
    return site;
  }

  @SiteRole('ADMIN', 'CONTRIBUTOR', 'READER')
  @UseGuards(SiteRoleGuard)
  @Get()
  async listSites() {
    const sites = await this.service.getAll();
    this.logger.info('GET', 'READ', 'get all sites request', sites);
    return sites;
  }

  @SiteRole('ADMIN', 'CONTRIBUTOR')
  @UseGuards(SiteRoleGuard)
  @Post()
  async addSite(@Body() dto: AddSiteDto){
    const site = await this.service.add(dto.orgId, dto.name);
    this.logger.info('POST', 'CREATE', 'create site request', site);
    return site;
  }

  /**@MessagePattern('list')
  async list(@Payload() data: any) {
    const sites = await this.service.getAll();
    this.logger.info('MSG', 'READ', 'get all sites message', sites);
    return sites;
  }
  
  @MessagePattern('find')
  async find(@Payload() data: any) {
    const site = await this.service.get(data.id);
    this.logger.info('MSG', 'READ', 'get site message', site);
    return site;
  }

  @MessagePattern('byOrgId')
  async getByOrgId(@Payload() data: any) {
    const sites = await this.service.getByOrgId(data.id)
    this.logger.info('MSG', 'READ', 'get org sites message', sites);
    return sites;
  }

  @MessagePattern('findRole')
  async findRole(@Payload() data: any) {
    const role = await this.service.get(data.id);
    this.logger.info('MSG', 'READ', 'get role message', role);
    return role;
  }**/
}