import { AccountsContext, Org, Role } from "@diamond/mongo";
import { Injectable } from "@nestjs/common"


@Injectable()
export class AppService {

  constructor(protected readonly db: AccountsContext){}

  async get(id: string) {
    return this.db.sites.findById(id)
      .populate('org')
      .populate('roles')
      .populate({ path: 'roles', populate: { path: 'permissions'}});
  }

  async getAll() {
    return await this.db.sites.findAll()
      .populate('org')
      .populate('roles')
      .populate({ path: 'roles', populate: { path: 'permissions'}});
  }

  async add(orgId: string, name: string) {

    const roles: Role[] = await this.db.roles.findAll();
    const org: Org = await this.db.orgs.findById(orgId);

    let site = await this.db.sites.create({ org: org, name: name, roles: roles });
        
    site = await site.populate('org');
    site = await site.populate('roles');
    site = await site.populate({ path: 'roles', populate: { path: 'permissions' } });

    return site;
  }
}