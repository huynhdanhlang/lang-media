import { Field, ObjectType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@ObjectType()
export class UserClient implements CreateUserInput {
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
}
