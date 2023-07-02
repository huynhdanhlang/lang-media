import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { UpdateVideoInput } from './update-video.input';
import { BaseFilter } from '../../shared/graphql-custom-filter.input';
import { AnyOrObject } from '../../utils/graphql';

@InputType()
export class VideoWhereClause extends OmitType(PartialType(UpdateVideoInput), [
  'id',
  'name',
] as const) {
  @Field(() => [Int])
  id?: number[];
  @Field(() => AnyOrObject)
  name?: string | number | object;
}

@InputType()
export class VideoFilter extends PartialType(BaseFilter) {
  where?: VideoWhereClause;
}
