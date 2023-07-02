import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { InjectModel } from '@nestjs/sequelize';
import Tag from '../database/models/Tag';
import { Attributes, FindOptions, Model } from 'sequelize';
import { checkIsExisted } from '../helper/model';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag) private tagService: typeof Tag) {}
  async create(createTagInput: CreateTagInput) {
    const tag = await checkIsExisted({
      service: this.tagService,
      where: {
        name: createTagInput.name,
      },
    });
    if (tag) {
      throw new BadRequestException({
        message: 'Tag đã tồn tại',
      });
    }
    return this.tagService.create(createTagInput);
  }

  async findAll<M extends Model<Tag>>(options?: FindOptions<Attributes<M>>) {
    return this.tagService.findAll(options);
  }

  async findOne(id: number) {
    return this.tagService.findByPk(id);
  }

  async update(id: number, updateTagInput: UpdateTagInput) {
    return this.tagService.update(updateTagInput, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const user = await this.tagService.findByPk(id);
    await user.destroy();
  }
}
