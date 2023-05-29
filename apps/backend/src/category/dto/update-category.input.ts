import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends OmitType(CreateCategoryInput, [
  'name',
]) {
  @Field(() => Int)
  id: number;
}
