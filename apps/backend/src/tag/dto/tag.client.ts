import { CreateTagInput } from '@graphqlTypes';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagClient implements CreateTagInput {
  @Field(() => String)
  name: string;
}
