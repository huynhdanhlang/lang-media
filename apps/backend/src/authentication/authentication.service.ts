import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService) {}
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
}
