import { CreateVideoInput } from '@graphqlTypes';
import { Field, Int, ObjectType, PartialType } from '@nestjs/graphql';
@ObjectType()
export class VideoClient implements CreateVideoInput {
  @Field(() => Int)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => String)
  url: string;
  @Field(() => String, { nullable: true })
  trailerUrl?: string;
  @Field(() => String, { nullable: true })
  language?: string;
  @Field(() => Int, { nullable: true })
  view?: number;
  @Field(() => String)
  country: string;
}
