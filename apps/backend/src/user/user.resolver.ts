import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserClient } from './dto/user.client';

@Resolver(() => UserClient)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserClient)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserClient], { nullable: true })
  findAllUser() {
    return this.userService.findAll();
  }

  @Query(() => UserClient, { nullable: true })
  findOneUser(@Args('id', { type: () => Int }) id: number) {
    console.log(
      '🚀 ~ file: user.resolver.ts:23 ~ UserResolver ~ findOne ~ id:',
      id
    );

    return this.userService.findOne(id);
  }

  @Mutation(() => UserClient)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserClient)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
