import { Field, InputType } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { FileUpload } from 'graphql-upload/Upload.mjs';

@InputType()
export class CreateFileInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  breed: string;
  @Field(() => GraphQLUpload)
  image: Promise<FileUpload>;
}
