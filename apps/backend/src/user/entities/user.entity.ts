import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { CreateUserInput } from '@graphqlTypes';
import { RoleEntity } from '../../role/entities/role.entity';

@ObjectType()
export class UserEntity implements CreateUserInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { description: "user's name" })
  username: string;

  @HideField()
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

  @Field(() => RoleEntity)
  role: RoleEntity;

  @Field(() => Int)
  roleId: number;

  @Field(() => Date)
  createdAt: Date;

  @HideField()
  currentHashedRefreshToken: string;

  accessToken?: string;
  refreshToken?: string;
}
