import { Injectable } from "@nestjs/common";
import { Org } from "../core/database/collection/schema/org.schema";
import { User } from "../core/database/collection/schema/user.schema";
import { DatabaseContext } from "../core/database/database.context";

@Injectable()
export class UserService {
  constructor(protected readonly db: DatabaseContext){}

  async get(id: string) {
    const query = this.db.users.findById(id);
    await query.populate("org");
    await query.populate("roles");
  }

  async getCollection() {
    const query = this.db.users.findAll();
    await query.populate("org");
    await query.populate("roles");
  }

  async add(orgId: string, name: string) {
    //const org: Org = await this.db.orgs.findById(orgId);
    //const createQuery = await this.db.users.create({ org: org, name: name });
    //return await createQuery.populate("org");
  }


 
}