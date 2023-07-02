import { CreateCategoryInput } from '@graphqlTypes';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { VideoEntity } from '../../video/entities/video.entity';

@ObjectType()
export class CategoryEntity implements CreateCategoryInput {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [VideoEntity])
  videos: VideoEntity[];
}
