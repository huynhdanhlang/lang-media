import { GraphQLError, GraphQLErrorExtensions } from 'graphql';

interface GraphQLErrorExtensionsCustom extends GraphQLErrorExtensions {
  [attributeName: string]: any;
}
export interface GraphQLErrorCustom extends GraphQLError {
  extensions: GraphQLErrorExtensionsCustom;
}
