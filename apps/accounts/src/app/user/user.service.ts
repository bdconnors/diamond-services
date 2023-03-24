import { Injectable } from "@nestjs/common";
import { AccountsContext } from "../module/mongo/accounts/accounts.context";
import { Org } from "../module/mongo/accounts/schema/org.schema";
import { Role } from "../module/mongo/accounts/schema/role.schema";
import { Site } from "../module/mongo/accounts/schema/site.schema";
import { SiteRole } from "../module/mongo/accounts/schema/user.schema";
import { EncryptionService } from "../module/encryption/encryption.service";

@Injectable()
export class UserService {

  constructor(
    protected readonly db: AccountsContext,
    protected readonly encryption: EncryptionService
  ){}

  async add(orgId: string, fname: string, lname: string, email: string, pass: string) {
    const org: Org = await this.db.orgs.findById(orgId);
    const encryptedPass = await this.encryption.encrypt(pass);
    let user = await this.db.users.create({
      firstName: fname,
      lastName: lname,
      email: email,
      password: encryptedPass,
      verified: false,
      org: org,
      roles:[]
    })
    user = await user.populate('org');
    user = await user.populate('roles');
    return user;
  }


  async get(id: string) {
    return await this.db.users.findById(id) 
      .populate('org')
      .populate('roles');
  }

  async getByEmail(email: string) {
    const results = await this.db.users.filter({ email: email })
      .populate('org')
      .populate('roles');
    return results[0];
  }

  async getOrgUsers(orgId: string) {
    return await this.db.users.filter({ org: orgId })
      .populate('org')
      .populate('roles');
  }

  async getAll() {
    return await this.db.users.findAll().populate('org');
  }

  async delete(id: string) {
    await this.db.users.deleteById(id);
  }

  async update(id: string, fname?: string, lname?:string, email?: string, pass?: string) {
    let user = await this.db.users.findById(id);

    user.firstName = fname ? fname : user.firstName;
    user.lastName = lname ? lname : user.lastName;
    user.email = email ? email : user.email;
    user.verified = email ? false : user.verified;
    user.password = pass ? await this.encryption.encrypt(pass) : user.password;

    user = await this.db.users.updateById(id, user);

    user = await user.populate('org');
    user = await user.populate('roles');

    return user;
  }

  private async makeSiteRoles(roles: { siteId: string, roleId: string }[]): Promise<SiteRole[]> {
    let results: SiteRole[] = [];

    let cursor: { siteId: string, roleId: string };
    let site: Site;
    let role: Role;
    let siteRole: SiteRole;
    for(let i = 0; i < roles.length; i++) {
      cursor = roles[i];
      site = await this.db.sites.findById(cursor.siteId);
      role = await this.db.roles.filter({ roleId: cursor.roleId})[0];
      siteRole = { site: site, role: role };
      results.push(siteRole);
    }

    return results;
  }
}