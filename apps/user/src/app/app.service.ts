import { EncryptionService } from "@diamond/encryption";
import { AccountsContext, Org, SiteRole, UserCollection } from "@diamond/mongo";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy, ClientRMQ } from "@nestjs/microservices";
import { Types } from "mongoose";
import { lastValueFrom } from "rxjs";
import validator from "validator";
import { ListUsersDto } from "./dto/list-users.dto";
import { LoginResultDto } from "./dto/login-result.dto";

@Injectable()
export class AppService {

  constructor(
    @Inject('SITE_SERVICE') private sites: ClientRMQ,
    @Inject('ORG_SERVICE') private orgs: ClientRMQ,
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

  async add(orgId: string, fname: string, lname: string, email: string, pass: string) {
    
    const msg = await this.orgs.send('get', { id: orgId });
    const org = await lastValueFrom(msg);

    const encryptedPass = await this.encryption.encrypt(pass);

    let user = await this.users.create({
      firstName: fname,
      lastName: lname,
      email: email,
      password: encryptedPass,
      verified: false,
      org: org,
      roles:[]
    });
    
    user = await user.populate('org');
    user = await user.populate('roles');
    
    return user;
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
    const siteMsg = await this.sites.send('find', { id: siteId }).pipe();
    const roleMsg = await this.sites.send('findRole', { id: roleId });
    const site = await lastValueFrom(siteMsg);
    const role = await lastValueFrom(roleMsg);
    
    return { site: site, role: role };
  }
}