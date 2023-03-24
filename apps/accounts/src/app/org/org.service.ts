import { Injectable } from "@nestjs/common";
import { Org } from "../core/database/collection/schema/org.schema";
import { DatabaseContext } from "../core/database/database.context";

@Injectable()
export class OrgService {
  constructor(protected readonly db: DatabaseContext){}

  async add(name: string) {
    return await this.db.orgs.create({ name: name });
  }

  async get(id: string) {
    return await this.db.orgs.findById(id);
  }

  async getCollection(){
    return await this.db.orgs.findAll();
  }

  async update(id: string, org: Org) {
    return await this.db.orgs.updateById(id, org);
  }

  async delete(id: string) {
    await this.db.orgs.deleteById(id);
  }
}