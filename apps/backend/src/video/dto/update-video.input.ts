import { CreateVideoInput } from './create-video.input';
import { InputType, Field, Int, OmitType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends PartialType(
  OmitType(CreateVideoInput, ['name'])
) {
  @Field(() => Int, { nullable: true })
  id?: number;
}
