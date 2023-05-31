import { CreateCategoryInput } from '@graphqlTypes';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryEntity implements CreateCategoryInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
