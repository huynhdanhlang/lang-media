import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
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
export { Void, getRequestGraphQL };
