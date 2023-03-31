import { OrgCollection } from "@diamond/mongo";
import { Inject, Injectable } from "@nestjs/common";
import { ClientRMQ } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private users: ClientRMQ,
    protected readonly orgs: OrgCollection
  ){}


  async add(name: string) {
    return await this.orgs.create({ name: name });
  }

  async get(id: string) {
    let org = await this.orgs.findById(id);
    return org;
  }

  async getAll(){
    return await this.orgs.findAll();
  }

  async getUsers(orgId: string) {
    console.log('org svc')
    console.log(orgId);
    try{
      const msg = await this.users.send('byOrgId', { id: orgId });
      return await lastValueFrom(msg);
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