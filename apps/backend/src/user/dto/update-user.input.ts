import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends OmitType(CreateUserInput, ['username']) {
  @Field(() => Int)
  id: number;
  currentHashedRefreshToken?: string;
}
