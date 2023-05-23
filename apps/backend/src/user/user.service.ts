import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import UserModel from '../database/models/User';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private userService: typeof UserModel) {}
  async create(createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  async findAll() {
    return this.userService.findAll();
  }

  async findOne(id: number) {
    return this.userService.findByPk(id);
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
}
