import { CreateTagInput } from '@graphqlTypes';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagEntity implements CreateTagInput {
  @Field(() => Int)
  id: number;
  
  @Field(() => String)
  name: string;
}