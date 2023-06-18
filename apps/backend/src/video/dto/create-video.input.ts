import { InputType, Int, Field, OmitType } from '@nestjs/graphql';
import { ValidatePromise } from 'class-validator';
import { FileUploadDto } from '../../shared/grahql.input';
import { Type } from 'class-transformer';
import { GraphQLUpload } from 'graphql-upload';
@InputType()
export class CreateVideoDto {
  @Field(() => String)
  name: string;
  // @Field(() => GraphQLUpload)
  // @ValidatePromise()
  // @Type(() => FileUploadDto)
  // video: Promise<FileUploadDto>;
  // @Field(() => GraphQLUpload)
  // @ValidatePromise()
  // @Type(() => FileUploadDto)
  // trailerVideo: Promise<FileUploadDto>;
  @Field(() => String, { nullable: true })
  language?: string;
  @Field(() => Int, { nullable: true })
  view?: number;
  @Field(() => String)
  country: string;
  // @Field(() => GraphQLUpload)
  // @ValidatePromise()
  // @Type(() => FileUploadDto)
  // posterImage: Promise<FileUploadDto>;
  description: string;
  @Field(() => [Int])
  categories: number[];
  @Field(() => [Int])
  tags: number[];
}

@InputType()
export class CreateVideoInput extends OmitType(CreateVideoDto, [
  'categories',
  'tags',
  // 'posterImage',
  // 'video',
  // 'trailerVideo',
]) {
  url?: string;
  trailerUrl?: string;
  poster?: string;
}
