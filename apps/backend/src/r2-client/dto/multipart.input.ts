import { Field, InputType, Int, PickType } from '@nestjs/graphql';

@InputType()
export class InitMultiPartDto {
  filename: string;
  fileExt: string;
}

@InputType()
export class MultiPartPreSignedUrlDto {
  fileKey: string;
  fileId: string;
  @Field(() => Int)
  parts: number;
  @Field(() => Int)
  videoId: number;
}

@InputType()
export class MultiPartFinal {
  @Field(() => Int)
  PartNumber: number;
  ETag: string;
}

@InputType()
export class MapMultiPartFinalDto extends PickType(MultiPartPreSignedUrlDto, [
  'fileId',
  'fileKey',
  'videoId',
]) {
  @Field(() => [MultiPartFinal])
  parts: MultiPartFinal[];
  fieldType: string;
}
