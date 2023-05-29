import { CreateVideoInput } from './create-video.input';
import { InputType, Field, Int, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateVideoInput extends OmitType(CreateVideoInput, ['name']) {
  @Field(() => Int)
  id: number;
}
