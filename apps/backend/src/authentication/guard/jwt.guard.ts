import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { getRequestGraphQL } from '../../utils/graphql';

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {
  private name: string;
  constructor(name?: string) {
    super();
    this.name = name;
  }
  getRequest(context: ExecutionContext) {
    return getRequestGraphQL(context, [this.name]);
  }
}
