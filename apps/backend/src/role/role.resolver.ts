import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { RoleEntity } from './entities/role.entity';
import { CreateRoleInput } from './dto/create-role.input';
import { UpdateRoleInput } from './dto/update-role.input';

@Resolver(() => RoleEntity)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => RoleEntity)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.roleService.create(createRoleInput);
  }

  @Query(() => [RoleEntity], { name: 'role' })
  findAllRole() {
    return this.roleService.findAll();
  }

  @Query(() => RoleEntity, { name: 'role' })
  findBkRole(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.findOne(id);
  }

  @Mutation(() => RoleEntity)
  updateRole(@Args('updateRoleInput') updateRoleInput: UpdateRoleInput) {
    return this.roleService.update(updateRoleInput.id, updateRoleInput);
  }

  @Mutation(() => RoleEntity)
  removeRole(@Args('id', { type: () => Int }) id: number) {
    return this.roleService.remove(id);
  }
}
