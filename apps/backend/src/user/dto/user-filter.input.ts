import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { BaseFilter } from '../../shared/graphql-custom-filter.input';
import { UpdateUserInput } from './update-user.input';

@InputType()
export class UserWherClause extends OmitType(PartialType(UpdateUserInput), [
  'id',
] as const) {
  @Field(() => [Int])
  id?: number[];
}

@InputType()
export class UserFilter extends PartialType(BaseFilter) {
  where?: UserWherClause;
}
