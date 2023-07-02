import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { UserEntity } from '../user/entities/user.entity';
import { UseGuards, Response, UseInterceptors } from '@nestjs/common';
import { LocalAuthenticationGuard } from './guard/local.guard';
import { LoginInput } from './dto/login.input';
import { GraphQLContext } from './interface/graphqlContext.interface';
import { ObjectMessage } from './entities/response.client';
import JwtRefreshGuard from './guard/jwt-refresh.guard';
import { UserService } from '../user/user.service';

@Resolver(() => UserEntity)
export class AuthenticationResolver {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  @Mutation(() => UserEntity)
  @UseGuards(LocalAuthenticationGuard)
  async login(
    @Args('loginInput')
    loginInput: LoginInput,
    @Context() context: GraphQLContext
  ) {
    const { req, res } = context;
    const { user } = req;
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
      user.username
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authenticationService.getCookieWithJwtRefreshToken(
        user.id,
        user.username
      );
    await this.userService.setCurrentRefreshToken(refreshToken, user.id);
    res.setHeader('Set-Cookie', [refreshTokenCookie]);
    user['accessToken'] = accessTokenCookie;
    user['refreshToken'] = refreshToken;
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

  @Query(() => UserEntity)
  @UseGuards(JwtRefreshGuard)
  refreshToken(@Context() context: GraphQLContext) {
    const { res, req } = context;
    const { user } = req;
    const accessTokenCookie = this.authenticationService.getCookieWithJwtToken(
      user.id,
      user.username
    );

    res.setHeader('Set-Cookie', accessTokenCookie);
    return user;
  }
}
