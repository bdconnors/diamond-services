import { Controller, Get } from '@nestjs/common';
import { SiteRepository } from './site.repository';

@Controller('/sites')
export class SiteController {
  constructor(private repo: SiteRepository) {}
  @Get()
  async listSites() {
    return await this.repo.getAll();
  }
}