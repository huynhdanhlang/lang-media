import { Field, InputType, Int, OmitType, PartialType } from '@nestjs/graphql';
import { UpdateVideoInput } from './update-video.input';
import { BaseFilter } from '../../shared/graphql-custom-filter.input';

@InputType()
export class VideoWherClause extends OmitType(PartialType(UpdateVideoInput), [
  'id',
] as const) {
  @Field(() => [Int])
  id?: number[];
}

@InputType()
export class VideoFilter extends PartialType(BaseFilter) {
  where?: VideoWherClause;
}
