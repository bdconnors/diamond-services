import { Injectable } from "@nestjs/common";
import { Org } from "../core/database/collection/schema/org.schema";
import { Permission } from "../core/database/collection/schema/permission.schema";
import { Role } from "../core/database/collection/schema/role.schema";
import { Site } from "../core/database/collection/schema/site.schema";
import { DatabaseContext } from "../core/database/database.context";

@Injectable()
export class SiteService {
  constructor(protected readonly db: DatabaseContext){}

  async get(id: string) {
    const query = this.db.sites.findById(id);
    return await query.populate('org');
  }

  async getCollection() {
    const query = this.db.sites.findAll();
    return await query.populate('org');
  }

  async add(orgId: string, name: string, withRoles:boolean = true) {
    const org: Org = await this.db.orgs.findById(orgId);
    const createQuery = await this.db.sites.create({ org: org, name: name });
    const site =  await createQuery.populate('org');
    if(withRoles) {
      const roles: Role[] = await this.getDefaultRoles(site.id);
      await this.db.roles.createMany(roles);
    }
    return site;
  }

  private async getAllPermissions() {
    return await this.db.roles.filter({ 
      title: { 
        $in:[
          'CREATE', 
          'READ', 
          'UPDATE', 
          'DELETE'
        ] 
      }
    });
  }
  

  private async getDefaultRoles(siteId: string) {
    const site: Site = await this.get(siteId);
    const permissions: Permission[] = await this.getAllPermissions();
    return [
      {
        title: 'ADMIN',
        label: 'Administrator',
        description: 'Create, Read, Update and Delete privileges',
        site: site,
        permissions: permissions
      },
      {
        title: 'CONTRIBUTOR',
        label: 'Data Contributor',
        description: 'Create, Read, and Update privileges',
        site: site,
        permissions: permissions.filter((perm:Permission) => perm.title !== 'DELETE')
      },
      {
        title: 'READER',
        label: 'Data Reader',
        description: 'Read privileges',
        site: site,
        permissions: permissions.filter((perm:Permission) => perm.title === 'READ')
      }
    ];

  }
}