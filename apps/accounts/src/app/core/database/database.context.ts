import { Injectable } from "@nestjs/common";
import { OrgCollection } from "./collection/org.collection";
import { PermissionCollection } from "./collection/permission.collection";
import { RoleCollection } from "./collection/role.collection";
import { SiteCollection } from "./collection/site.collection";
import { UserCollection } from "./collection/user.collection";

@Injectable()
export class DatabaseContext {
  constructor(
    public readonly orgs: OrgCollection,
    public readonly sites: SiteCollection,
    public readonly roles: RoleCollection,
    public readonly permissions: PermissionCollection,
    public readonly users: UserCollection,
  ){}
}