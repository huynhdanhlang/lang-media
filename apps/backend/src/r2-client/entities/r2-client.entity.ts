import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InitMultiPartEntity {
  fileId: string;
  fileKey: string;
}

@ObjectType()
export class MapMultiPart {
  signedUrl: string;
  PartNumber: number;
}

@ObjectType()
export class IProcessingMultipartUploadEntity {
  @Field(() => [MapMultiPart])
  parts: MapMultiPart[];
}
