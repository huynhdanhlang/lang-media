import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { UserService } from '../../user/user.service';
import { TokenPayload } from '../interface/token.payload';
import { cookieParser } from '../../shared/headers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return (
            request?.cookies?.Authentication ??
            cookieParser(request.headers?.cookies)?.Authentication
          );
        },
      ]),
      secretOrKey: configService.get('NX_JWT_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    return this.userService.findBk(payload.userId);
  }
  error(err: Error): void {
    throw new UnauthorizedException(err)
  }
}
