import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field(() => String, { description: 'Name of role' })
  name: string;
}
