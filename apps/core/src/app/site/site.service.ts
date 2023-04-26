import { Org, OrgCollection, SiteCollection } from "@diamond/mongo";
import { Injectable } from "@nestjs/common"
import { Types } from "mongoose";
import { OrgService } from "../org/org.service";


@Injectable()
export class SiteService {

  constructor(
    protected readonly orgs: OrgCollection,
    protected readonly sites: SiteCollection
  ){}

  async get(id: string) {
    return this.sites.findById(id).populate('org');
  }

  async getAll() {
    return await this.sites.findAll().populate('org');
  }

  async getByOrgId(orgId: string ) {
    return await this.sites.filter({ org: new Types.ObjectId(orgId) }).populate('org');
  }

  async add(orgId: string, name: string) {
    const org: Org = await this.orgs.findById(orgId);
    
    let site = await this.sites.create({ org: org, name: name });
        
    site = await site.populate('org');

    return site;
  }
}