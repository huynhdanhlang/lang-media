import { Field, ObjectType } from '@nestjs/graphql';
import { CreateCategoryInput } from './create-category.input';

@ObjectType()
export class CategoryClient implements CreateCategoryInput {
  @Field(() => String)
  name: string;
}
