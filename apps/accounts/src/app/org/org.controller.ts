import { Controller, Get } from '@nestjs/common';
import { OrgRepository } from './org.repository';

@Controller('/orgs')
export class OrgController {
  constructor(private repo: OrgRepository) {}
  @Get()
  async listOrgs() {
    return await this.repo.getAll();
  }
}