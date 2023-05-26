import { Field, ObjectType } from '@nestjs/graphql';
import { CreateTagInput } from './create-tag.input';

@ObjectType()
export class TagClient implements CreateTagInput {
  @Field(() => String)
  name: string;
}
