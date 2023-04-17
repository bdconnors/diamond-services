import { SetMetadata } from "@nestjs/common";

export enum OrgRoleType {
  Admin = "ADMIN",
  Contributor = "CONTRIBUTOR",
  Reader = "READER"
}

export const ORG_ROLES_KEY = "orgroles";
export const OrgRoles = (...roles: OrgRoleType[]) => SetMetadata(ORG_ROLES_KEY, roles);