import { CreateVideoInput } from '@graphqlTypes';
import { Field, Int, ObjectType, PartialType } from '@nestjs/graphql';
import { TagEntity } from '../../tag/entities/tag.entity';
@ObjectType()
export class VideoEntity implements CreateVideoInput {
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
  @Field(() => [TagEntity])
  tags: TagEntity[];
  poster?: string;
}
