import { ExecutionContext } from '@nestjs/common';
import {
  GqlExecutionContext,
  Int,
  createUnionType,
  registerEnumType,
} from '@nestjs/graphql';
import { GraphQLScalarType } from 'graphql';

function getRequestGraphQL(context: ExecutionContext, args: any[]) {
  const ctx = GqlExecutionContext.create(context);
  const gqlReq = ctx.getContext().req;
  if (gqlReq) {
    const arg = ctx.getArgs();
    if (args.length) {
      gqlReq.body = arg[args[0]];
    }
    return gqlReq;
  }
  return context.switchToHttp().getRequest();
}

const Void = new GraphQLScalarType({
  name: 'Void',

  description: 'Represents NULL values',

  serialize() {
    return null;
  },

  parseValue() {
    return null;
  },

  parseLiteral() {
    return null;
  },
});

export enum FileFiledType {
  POSTER_URL = 'poster',
  VIDEO_URL = 'url',
  TRAILER_URL = 'trailerUrl',
}

const AnyOrObject = new GraphQLScalarType({
  name: 'AnyOrObject',
  description: 'Object | String',
  serialize() {
    throw new Error('AnyOrObject is an input type.');
  },
  parseValue(value) {
    if (typeof value === 'string') return value;
    else if(typeof value == "number") return value;
    return value;
  },
  parseLiteral() {
    throw new Error('AnyOrObject.parseLiteral not implemented');
  },
});
export { Void, getRequestGraphQL, AnyOrObject };
