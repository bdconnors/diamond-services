import { Org, OrgCollection, PermissionCollection, Role, RoleCollection, SiteCollection } from "@diamond/mongo";
import { Injectable } from "@nestjs/common"
import { Types } from "mongoose";
import { OrgService } from "../org/org.service";


@Injectable()
export class SiteService {

  constructor(
    protected readonly orgs: OrgCollection,
    protected readonly sites: SiteCollection,
    protected readonly roles: RoleCollection
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
      .populate({ path: 'roles', populate: { path: 'permissions'}});
  }

  async getByOrgId(orgId: string ) {
    return await this.sites.filter({ org: new Types.ObjectId(orgId) })
    .populate('org')
    .populate('roles')
    .populate({ path: 'roles', populate: { path: 'permissions'}});
  }

  async add(orgId: string, name: string) {
    const org: Org = await this.orgs.findById(orgId);
    const roles: Role[] = await this.roles.findAll();
    
    let site = await this.sites.create({ org: org, name: name, roles: roles });
        
    site = await site.populate('org');
    site = await site.populate('roles');
    site = await site.populate({ path: 'roles', populate: { path: 'permissions' } });

    return site;
  }
}