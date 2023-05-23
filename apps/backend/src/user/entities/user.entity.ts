import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
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

  @Field(() => String)
  address?: string;

  @Field(() => String)
  phone?: string;
}
