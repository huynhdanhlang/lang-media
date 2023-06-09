import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { getRequestGraphQL } from '../../utils/graphql';

@Injectable()
export class LocalAuthenticationGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    return getRequestGraphQL(context, ['loginInput']);
  }
}
