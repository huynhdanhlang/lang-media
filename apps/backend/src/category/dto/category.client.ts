import { CreateCategoryInput } from '@graphqlTypes';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryClient implements CreateCategoryInput {
  @Field(() => String)
  name: string;
}
