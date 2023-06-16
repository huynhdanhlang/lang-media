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
  @Field(() => [Int])
  parts: number;
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
]) {
  @Field(() => [MultiPartFinal])
  parts: MultiPartFinal[];
}
