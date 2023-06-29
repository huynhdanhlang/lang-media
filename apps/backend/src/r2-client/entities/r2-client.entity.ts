import { Field, Int, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class InitMultiPartEntity {
  fileId: string;
  fileKey: string;
}
@ObjectType()
export class MapProcessingMultiPart {
  signedUrl: string;
  @Field(() => Int)
  PartNumber: number;
}
@ObjectType()
export class IProcessingMultipartUploadEntity {
  @Field(() => [MapProcessingMultiPart])
  parts: MapProcessingMultiPart[];
}