import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { AccountsContext } from "../module/mongo/accounts/accounts.context";


@Injectable()
export class OrgService {
  constructor(protected readonly db: AccountsContext){}


  async add(name: string) {
    return await this.db.orgs.create({ name: name });
  }

  async get(id: string) {
    let org = await this.db.orgs.findById(id);
    return org;
  }

  async getAll(){
    return await this.db.orgs.findAll();
  }

  async getUsers(orgId: string) {
    const query = await this.db.users.filter({ org: new Types.ObjectId(orgId) })
      .populate('org')
      .populate('roles')
      .exec();
      return query;
  }

  async update(id: string, name: string) {
    let org = await this.get(id);
    org.name = name;
    org = await this.db.orgs.updateById(id, org);
  }

  async delete(id: string) {
    await this.db.orgs.deleteById(id);
  }
}