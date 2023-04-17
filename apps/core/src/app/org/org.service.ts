import { OrgCollection, Role, RoleCollection, SiteCollection, UserCollection } from "@diamond/mongo";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";

@Injectable()
export class OrgService {
  constructor(
    protected readonly users: UserCollection,
    protected readonly sites: SiteCollection,
    protected readonly roles: RoleCollection,
    protected readonly orgs: OrgCollection
  ){}


  async add(name: string) {
    const roles: Role[] = await this.roles.findAll();
    return await this.orgs.create({ name: name, roles: roles });
  }

  async get(id: string) {
    let org = await this.orgs.findById(id).populate('roles');
    return org;
  }

  async getAll(){
    return await this.orgs.findAll().populate('roles');
  }

  async getUsers(orgId: string) {
    try{
    const result = await this.users.filter({ org: new Types.ObjectId(orgId) }).populate('org')
      return result;
    }catch(e:any) {
      throw e;
    }
  }
  async getSites(orgId: string) {
    try{
      return await this.sites.filter({ org: new Types.ObjectId(orgId) })
      .populate('org')
      .populate('roles')
      .populate({ path: 'roles', populate: { path: 'permissions'}});
    }catch(e:any) {
      throw e;
    }
  }
  async update(id: string, name: string) {
    let org = await this.get(id);
    org.name = name;
    org = await this.orgs.updateById(id, org);
  }

  async delete(id: string) {
    await this.orgs.deleteById(id);
  }
}