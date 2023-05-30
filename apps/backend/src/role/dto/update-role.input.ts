import { CreateRoleInput } from './create-role.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateRoleInput extends OmitType(CreateRoleInput, ['name']) {
  @Field(() => Int)
  id: number;
}
