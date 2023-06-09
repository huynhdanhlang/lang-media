import { CreateRoleInput } from '@graphqlTypes';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleEntity implements CreateRoleInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
