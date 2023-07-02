import { Injectable } from '@nestjs/common';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';
import { InjectModel } from '@nestjs/sequelize';
import Role from '../database/models/Role';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleService: typeof Role) {}
  async create(createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  async findAll() {
    return this.roleService.findAll();
  }

  async findOne(id: number) {
    return this.roleService.findByPk(id);
  }

  async update(id: number, updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const user = await this.roleService.findByPk(id);
    await user.destroy();
  }
}
