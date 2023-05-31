import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import UserModel from '../database/models/User';
import { InjectModel } from '@nestjs/sequelize';
import { RoleService } from '../role/role.service';
import { compare, genSaltSync, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { FindOptions } from 'sequelize';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userService: typeof UserModel,
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

  async findAll() {
    return this.userService.findAll();
  }

  async findBk(id: number) {
    return this.userService.findByPk(id);
  }

  async findOne(options?: FindOptions<UserModel>) {
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
}
