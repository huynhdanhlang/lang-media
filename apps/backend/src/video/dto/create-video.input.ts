import { InputType, Int, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
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
