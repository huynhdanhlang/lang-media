import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class InitMultiPartDto {
  filename: string;
  fileExt: string;
}

@InputType()
export class MultiPartPreSignedUrlDto {
  fileKey: string;
  fileId: string;
  @Field(() => [Number])
  parts: number;
}

@InputType()
export class MultiPartFinal {
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
