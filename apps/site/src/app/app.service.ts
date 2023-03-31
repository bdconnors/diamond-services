import { AccountsContext, Org, PermissionCollection, Role, RoleCollection, SiteCollection } from "@diamond/mongo";
import { Injectable } from "@nestjs/common"


@Injectable()
export class AppService {

  constructor(
    protected readonly sites: SiteCollection,
    protected readonly roles: RoleCollection,
    protected readonly permissions: PermissionCollection
  ){}

  async get(id: string) {
    return this.sites.findById(id)
      .populate('org')
      .populate('roles')
      .populate({ path: 'roles', populate: { path: 'permissions'}});
  }
  
  async getRole(id:string) {
    const role = await this.roles.findById(id);
    return role.populate('permissions');
  }

  async getAll() {
    return await this.sites.findAll()
      .populate('org')
      .populate('roles')
      .populate({ path: 'roles', populate: { path: 'permissions'}});
  }

  async add(orgId: string, name: string) {

    const roles: Role[] = await this.roles.findAll();
    const org: Org = await this.sites.findById(orgId);

    let site = await this.sites.create({ org: org, name: name, roles: roles });
        
    site = await site.populate('org');
    site = await site.populate('roles');
    site = await site.populate({ path: 'roles', populate: { path: 'permissions' } });

    return site;
  }
}