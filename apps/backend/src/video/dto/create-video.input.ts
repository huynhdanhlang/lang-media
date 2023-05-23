import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
