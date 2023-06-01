import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { UserEntity } from '../user/entities/user.entity';
import { UseGuards, Response, UseInterceptors } from '@nestjs/common';
import { LocalAuthenticationGuard } from './guard/local.guard';
import { LoginInput } from './dto/login.input';
import { GraphQLContext } from './interface/graphqlContext.interface';
import { ObjectMessage } from './entities/response.client';

@Resolver(() => UserEntity)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => UserEntity)
  @UseGuards(LocalAuthenticationGuard)
  async login(
    @Args('loginInput')
    loginInput: LoginInput,
    @Context() context: GraphQLContext
  ) {
    const { req, res } = context;
    const { user } = req;
    const cookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
      user.username
    );
    res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @Mutation(() => ObjectMessage)
  async logout(@Context() context: GraphQLContext) {
    const { req, res } = context;
    res.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut()
    );
    return {
      message: 'Đã đăng xuất',
      statusCode: 200,
    };
  }
}
