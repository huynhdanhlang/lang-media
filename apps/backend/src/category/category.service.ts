import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { InjectModel } from '@nestjs/sequelize';
import Category from '../database/models/Category';
import { Attributes, FindOptions, Model } from 'sequelize';
import { checkIsExisted } from '../helper/model';
import { injectSequelizeFunc } from '../utils/sequelize';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private categoryService: typeof Category
  ) {}
  async create(createCategoryInput: CreateCategoryInput) {
    const category = await checkIsExisted({
      service: this.categoryService,
      where: {
        name: createCategoryInput.name,
      },
    });
    if (category) {
      throw new BadRequestException({
        message: 'Thể loại đã tồn tại',
      });
    }
    return this.categoryService.create(createCategoryInput);
  }

  async findAll<M extends Model<Category>>(
    options?: FindOptions<Attributes<M>>
  ) {
    return this.categoryService.findAll({
      ...options,
      where: injectSequelizeFunc({
        where: options.where,
      }),
    });
  }

  async findOne(id: number, options?: Omit<FindOptions<Category>, 'where'>) {
    return this.categoryService.findByPk(id, options);
  }

  async update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return this.categoryService.update(updateCategoryInput, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const user = await this.categoryService.findByPk(id);
    await user.destroy();
  }
}
