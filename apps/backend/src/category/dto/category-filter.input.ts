import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { BaseFilter } from '../../shared/graphql-custom-filter.input';
import { UpdateCategoryInput } from './update-category.input';
import { AnyOrObject } from '../../utils/graphql';

@InputType()
export class CategoryWherClause extends OmitType(PartialType(UpdateCategoryInput), [
  'id',
  "name"
] as const) {
  @Field(() => [Int])
  id?: number[];
  @Field(() => AnyOrObject)
  name?: string | number | object;
}

@InputType()
export class CategoryFilter extends PartialType(BaseFilter) {
  where?: CategoryWherClause;
}