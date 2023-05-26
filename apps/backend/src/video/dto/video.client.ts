import { Field, ObjectType } from '@nestjs/graphql';
import { CreateVideoInput } from './create-video.input';

@ObjectType()
export class VideoClient implements CreateVideoInput {
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
