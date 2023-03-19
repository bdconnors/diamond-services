import { Permission } from "@diamond/data";

export interface RoleModel {
  title: string;
  description: string;
  permissions: Permission[];
}