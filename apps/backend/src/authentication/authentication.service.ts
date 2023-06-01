import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { TokenPayload } from './interface/token.payload';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async getAuthenticatedUser(username: string, plainTextPassword: string) {
    try {
      const user = await this.userService.findOne({
        where: {
          username,
        },
      });
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Mật khẩu không chính xác',
        },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  getCookieWithJwtToken(userId: number, username: string) {
    const payload: TokenPayload = { userId, username };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'NX_JWT_EXPIRATION_TIME'
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
