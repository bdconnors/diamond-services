import { Injectable } from '@nestjs/common';
import { Role } from '@diamond/data';
import { PermissionCollection } from '@diamond/data';
import { RoleCollection } from '@diamond/data';
import { RoleDto, RoleModel } from '@diamond/models';
import { Permission } from '@diamond/data';
import { MongoService } from '../mongodb';

@Injectable()
export class RoleService extends MongoService<RoleModel, Role> {
  constructor(protected roles: RoleCollection, protected permissions: PermissionCollection) {
    super(roles)
  }

  async add(data: RoleDto): Promise<RoleModel> {
    const role = await this.roles.createOne(data);
    const result: RoleModel = await this.get(role.title);
    return result;
  }

  async get(title: string): Promise<RoleModel> {
    const role = await this.roles.findOne({ title: title });
    return await this.make(role); 
  }

  async getAll(): Promise<RoleModel[]> {
    const roles : Role[] = await this.roles.findAll();
    return await this.makeMany(roles);
  }

  async update(id: string, data: RoleDto): Promise<number> {
    return await this.roles.update(id, data);  
  }

  async delete(id: string): Promise<number> {
    return await this.roles.delete(id); 
  }

  async make(data: any): Promise<RoleModel> {
    const rolePermissions: Permission[] = await this.permissions.findManyById(data.permissions);

    const result: RoleModel = {
      title: data.title,
      description: data.description,
      permissions: rolePermissions
    };

    return result;
  }
}