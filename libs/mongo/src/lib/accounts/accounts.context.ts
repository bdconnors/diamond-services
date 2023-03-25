import { Injectable } from "@nestjs/common";
import { OrgCollection } from "./collection/org.collection";
import { PermissionCollection } from "./collection/permission.collection";
import { RoleCollection } from "./collection/role.collection";
import { SiteCollection } from "./collection/site.collection";
import { UserCollection } from "./collection/user.collection";
;
import { Permission } from "./schema/permission.schema";
import { Role } from "./schema/role.schema";

@Injectable()
export class AccountsContext {
  constructor(
    public readonly orgs: OrgCollection,
    public readonly sites: SiteCollection,
    public readonly roles: RoleCollection,
    public readonly permissions: PermissionCollection,
    public readonly users: UserCollection,
  ){}

  async onModuleInit() {
    try{

      const permissions = await this.permissions.findAll();
      if(permissions.length === 0) { await this.seedPermissions(); }

      const roles = await this.roles.findAll();
      if(roles.length === 0) { await this.seedRoles(); }

    } catch(e:any) {
      throw e;
    }
  }

  async seedPermissions() {
    const defaultPermissions: Permission[] = [
      {
        title: 'CREATE',
        label: 'Create',
        description: 'Create Permission'
      },
      {
        title: 'READ',
        label: 'Read',
        description: 'Read Permission'
      }, 
      {
        title: 'UPDATE',
        label: 'Update',
        description: 'Update Permission'
      },
      {
        title: 'DELETE',
        label: 'Delete',
        description: 'Delete Permission'
      }
    ];
    await this.permissions.createMany(defaultPermissions); 
  }

  async seedRoles() {

    const permissions = await this.permissions.findAll();

    const createPerm = permissions.find((perm: Permission)=>perm.title === 'CREATE');
    const readPerm = permissions.find((perm: Permission)=>perm.title === 'READ');
    const updatePerm = permissions.find((perm: Permission)=>perm.title === 'UPDATE');
    const deletePerm = permissions.find((perm: Permission)=>perm.title === 'DELETE');

    const defaultRoles: Role[] = [
      {
        title: 'ADMIN',
        label: 'Administrator',
        description: 'Grants Create, Read, Update, and Delete Permissions',
        permissions: [
          createPerm,
          readPerm,
          updatePerm,
          deletePerm
        ]
      },
      {
        title: 'CONTRIBUTOR',
        label: 'Data Contributor',
        description: 'Grant Create, Read, and Update Permissions',
        permissions: [
          createPerm,
          readPerm,
          updatePerm,
        ]
      },
      {
        title: 'READER',
        label: 'Data Reader',
        description: 'Grants Read Permission',
        permissions: [
          readPerm
        ]
      }
    ]; 
    await this.roles.createMany(defaultRoles);  
  }
}