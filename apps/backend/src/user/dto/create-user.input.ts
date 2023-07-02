import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "user's name" })
  username: string;

  @Field(() => String, { description: "user's password" })
  password: string;

  @Field(() => String)
  fullname: string;

  @Field(() => String)
  email: string;
}
