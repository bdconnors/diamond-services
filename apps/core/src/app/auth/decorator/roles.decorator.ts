import { SetMetadata } from "@nestjs/common";

export enum Role {
  Admin = "ADMIN",
  Contributor = "CONTRIBUTOR",
  Reader = "READER"
}

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);