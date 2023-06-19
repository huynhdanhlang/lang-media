import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
@InputType()
export class FAttributeOptions {
  exclude?: string[];
  include?: string[];
}
@InputType()
export class IncludeModel {
  association?: string;
  attributes?: FAttributeOptions;
  @Field(() => GraphQLJSON)
  where?: any;
  include?: IncludeModel[];
}

@InputType()
export class BaseFilter {
  attributes?: FAttributeOptions;
  include?: IncludeModel[];
  group?: string;
  limit?: number;
  mapToModel?: boolean;
  nest?: boolean;
  offset?: number;
  paranoid?: boolean;
  plain?: boolean;
  raw?: boolean;
  skipLocked?: boolean;
  subQuery?: boolean;
  type?: string;
  useMaster?: boolean;
  @Field(() => [[String]])
  order: string[][];
}
