import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import User from '../database/models/User';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from '../role/role.service';
import { compare, genSaltSync, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Attributes, FindOptions, Model } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userService: typeof User,
    private roleService: RoleService,
    private configService: ConfigService
  ) {}
  async create(createUserInput: CreateUserInput) {
    try {
      const salt = genSaltSync(this.configService.get('NX_HASH_NUMBER'));
      const passwordHashed = await hash(createUserInput.password, salt);
      const user = await this.userService.create({
        ...createUserInput,
        password: passwordHashed,
      });
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Không thể tạo người dùng',
        },
        HttpStatus.BAD_GATEWAY,
        {
          cause: error,
        }
      );
    }
  }

  async findAll<M extends Model<User>>(options?: FindOptions<Attributes<M>>) {
    return this.userService.findAll(options);
  }

  async findBk(id: number) {
    return this.userService.findByPk(id);
  }

  async findOne(options?: FindOptions<User>) {
    return this.userService.findOne(options);
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const user = await this.userService.findByPk(id);
    await user.destroy();
  }

  async getRole(id: number) {
    return this.roleService.findOne(id);
  }

  async setCurrentRefreshToken(refreshToken: string, userId: number) {
    const salt = genSaltSync(
      parseInt(this.configService.get('NX_HASH_NUMBER'))
    );
    const currentHashedRefreshToken = await hash(refreshToken, salt);
    await this.userService.update(
      {
        currentHashedRefreshToken,
      },
      {
        where: {
          id: userId,
        },
      }
    );
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
    const user = await this.findBk(userId);

    const isRefreshTokenMatching = await compare(
      refreshToken,
      user.currentHashedRefreshToken
    );

    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
