import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVideoInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  url: string;
  @Field(() => String, { nullable: true })
  trailerUrl: string;
  @Field(() => String, { nullable: true })
  language: string;
  @Field(() => String, { nullable: true })
  view: number;
  @Field(() => String)
  country: string;
}
