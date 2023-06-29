import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { BaseFilter } from '../../shared/graphql-custom-filter.input';
import { UpdateCategoryInput } from './update-category.input';

@InputType()
export class CategoryWherClause extends OmitType(PartialType(UpdateCategoryInput), [
  'id',
] as const) {
  @Field(() => [Int])
  id?: number[];
}

@InputType()
export class CategoryFilter extends PartialType(BaseFilter) {
  where?: CategoryWherClause;
}