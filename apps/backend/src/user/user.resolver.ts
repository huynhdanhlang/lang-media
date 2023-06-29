import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/guard/jwt.guard';
import { RoleEntity } from '../role/entities/role.entity';
import { Attributes, FindOptions, Model } from 'sequelize';
import User from '../database/models/User';
import { UserFilter } from './dto/user-filter.input';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Mutation(() => UserEntity)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserEntity], { nullable: true })
  findAllUser(
    @Args('userFilter', {
      nullable: true,
    })
    userFilter?: UserFilter
  ) {
    // @ts-ignore
    return this.userService.findAll({ ...userFilter });
  }

  @Query(() => UserEntity, { nullable: true })
  findOneUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findBk(id);
  }

  @ResolveField(() => RoleEntity, { nullable: true })
  async role(@Parent() parent: UserEntity) {
    const { roleId } = parent;
    return this.userService.getRole(roleId);
  }

  @Mutation(() => UserEntity)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserEntity)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
