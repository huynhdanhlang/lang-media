import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CreateUserInput } from '@graphqlTypes';
import { RoleClient } from '../../role/dto/role.client';

@ObjectType()
export class UserClient implements CreateUserInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: "user's name" })
  username: string;

  @Field(() => String, { description: "user's password" })
  password: string;

  @Field(() => String)
  fullname: string;

  @Field(() => String)
  email: string;

  @Field(() => String, {
    nullable: true,
  })
  address?: string;

  @Field(() => String, {
    nullable: true,
  })
  phone?: string;

  @Field(() => RoleClient)
  role: RoleClient;

  @Field(() => Int)
  roleId: number;

  @Field(() => Date)
  createdAt: Date;
}
