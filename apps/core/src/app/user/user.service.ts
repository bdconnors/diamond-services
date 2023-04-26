import { EncryptionService } from "@diamond/encryption";
import { Org, OrgCollection, SiteCollection, SiteRole, UserCollection, UserRole } from "@diamond/mongo";
import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { ListUsersDto } from "./dto/list-users.dto";

@Injectable()
export class UserService {

  constructor(
    protected readonly orgs: OrgCollection,
    protected readonly sites: SiteCollection,
    protected readonly users: UserCollection,
    protected readonly encryption: EncryptionService
  ){}

  async addSiteRole(userId: string, siteId: string, role: UserRole) {

    let user = await this.users.findById(userId).exec();
    user.siteRoles.push({ siteId: siteId, role: role });
    user = await this.users.updateById(userId, user);
    user = await user.populate('siteRoles');

    return user;
  }

  async add(orgId:string, fname: string, lname: string, email: string, pass: string, orgRole: UserRole, mobileNumber: string, sites?: SiteRole[] ) {
    
  
    const encryptedPass = await this.encryption.encrypt(pass);
    let user = await this.users.create({
      firstName: fname,
      lastName: lname,
      email: email,
      password: encryptedPass,
      mobileNumber: mobileNumber,
      orgId: orgId,
      orgRole: orgRole,
      siteRoles: sites ? sites : []
    });
     
    return user;
  }


  async get(id: string) {
    return await this.users.findById(id).populate('siteRoles');
  }

  async getByEmail(email: string) {
    const results = await this.users.filter({ email: email }).populate('siteRoles');
    return results[0];
  }

  async getOrgUsers(orgId: string) {
    console.log(orgId);
    const result = await this.users.filter({ org: new Types.ObjectId(orgId) }).populate('siteRoles');
      return result;
  }

  async getAll():Promise<ListUsersDto> {
    const users = await this.users.findAll().populate('siteRoles');
    return { users: users };
  }

  async delete(id: string) {
    await this.users.deleteById(id);
  }

  /**async updateInfo(id: string, fname?: string, lname?:string, email?: string, pass?: string) {
    let user = await this.users.findById(id);

    //if value is new, update it. Otherwise leave the same.
    user.firstName = fname ? fname : user.firstName;
    user.lastName = lname ? lname : user.lastName;
    user.email = email ? email : user.email;
    //encrypt plain text value
    user.password = pass ? await this.encryption.encrypt(pass) : user.password;

    user = await this.users.updateById(id, user);
    user = await user.populate('siteRoles');
    
    return user;
  }

  async makeOrgRole(orgId: string, roleId: string):Promise<OrgRole> {
    const org: Org = await this.orgs.findById(orgId);
    const role: Role = await this.roles.findById(roleId);

    return{ org: org, role: role }
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
  
  private async makeSiteRole(siteId: string, roleId: string): Promise<SiteRole> {
    const site: Site = await this.sites.findById(siteId);
    const role: Role = await this.roles.findById(roleId);
    
    return { site: site, role: role };
  }**/
}