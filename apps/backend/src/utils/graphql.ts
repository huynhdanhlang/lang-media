import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export function getRequestGraphQL(context: ExecutionContext, args: any[]) {
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
