import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getRequestGraphQL } from '../../utils/graphql';

@Injectable()
export default class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
  getRequest(context: ExecutionContext) {
    return getRequestGraphQL(context, []);
  }
}
