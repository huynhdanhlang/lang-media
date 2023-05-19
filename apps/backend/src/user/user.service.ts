import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import User from '../database/models/User';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userService: typeof User) {}
  async create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async findAll() {
    return this.userService.findAll();
  }

  async findOne(id: number) {
    return this.userService.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto, {
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
