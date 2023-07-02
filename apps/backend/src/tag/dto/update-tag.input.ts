import { CreateTagInput } from './create-tag.input';
import { InputType, Field, Int, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateTagInput extends OmitType(CreateTagInput, ['name']) {
  @Field(() => Int)
  id: number;
}
