import { EncryptionService } from "@diamond/encryption";
import { OrgCollection, Role, RoleCollection, Site, SiteCollection, SiteRole, UserCollection } from "@diamond/mongo";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ListUsersDto } from "./dto/list-users.dto";

@Injectable()
export class UserService {

  constructor(
    protected readonly orgs: OrgCollection,
    protected readonly sites: SiteCollection,
    protected readonly roles: RoleCollection,
    protected readonly users: UserCollection,
    protected readonly encryption: EncryptionService
  ){}

  async addRole(userId: string, siteId: string, roleId: string) {

    let user = await this.users.findById(userId).exec();

    const role = await this.makeSiteRole(siteId, roleId);
    user.roles.push(role);
    user = await this.users.updateById(userId, user);
    user = await user.populate('org');
    user = await user.populate('roles');

    return user;
  }

  async add(orgId: string, fname: string, lname: string, email: string, pass: string, siteRoles:[{ siteId: string, roleId: string}] ) {
    
    const org = await this.orgs.findById(orgId);

    const encryptedPass = await this.encryption.encrypt(pass);
    const roles = await this.makeSiteRoles(siteRoles);
    let user = await this.users.create({
      firstName: fname,
      lastName: lname,
      email: email,
      password: encryptedPass,
      verified: false,
      org: org,
      roles:roles
    });
    
    user = await user.populate('org');
    user = await user.populate('roles');
    
    return user;
  }

  async makeSiteRoles(siteRoles:[{ siteId: string, roleId: string}]): Promise<SiteRole[]> {
    let results: SiteRole[] = [];

    let curSiteRole;
    for(let i = 0; i < siteRoles.length; i++) {
      curSiteRole = await this.makeSiteRole(siteRoles[i].siteId, siteRoles[i].roleId);
      results.push(curSiteRole);
    }
    return results;
  }
  async get(id: string) {
    return await this.users.findById(id) 
      .populate('org')
      .populate('roles');
  }

  async getByEmail(email: string) {
    const results = await this.users.filter({ email: email })
      .populate('org')
      .populate('roles');
    return results[0];
  }

  async getOrgUsers(orgId: string) {
    console.log(orgId);
    const result = await this.users.filter({ org: new Types.ObjectId(orgId) })
      .populate('org')
      .populate('roles');
      console.log(result);
      return result;
  }

  async getAll():Promise<ListUsersDto> {
    const users = await this.users.findAll()
      .populate('org')
      .populate('roles');
    return { users: users };
  }

  async delete(id: string) {
    await this.users.deleteById(id);
  }

  async updateInfo(id: string, fname?: string, lname?:string, email?: string, pass?: string) {
    let user = await this.users.findById(id);

    //if value is new, update it. Otherwise leave the same.
    user.firstName = fname ? fname : user.firstName;
    user.lastName = lname ? lname : user.lastName;
    user.email = email ? email : user.email;
    user.verified = email ? false : user.verified;
    //encrypt plain text value
    user.password = pass ? await this.encryption.encrypt(pass) : user.password;

    user = await this.users.updateById(id, user);
    
    user = await user.populate('org');
    user = await user.populate('roles');
    
    return user;
  }

  private async makeSiteRole(siteId: string, roleId: string): Promise<SiteRole> {
    const site: Site = await this.sites.findById(siteId);
    const role: Role = await this.roles.findById(roleId);
    
    return { site: site, role: role };
  }
}