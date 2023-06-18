import { Injectable } from '@nestjs/common';
import { CreateVideoDto, CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { InjectModel } from '@nestjs/sequelize';
import Video from '../database/models/Video';
import { Attributes, FindOptions, Model } from 'sequelize';
import Tag from '../database/models/Tag';
import Category from '../database/models/Category';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private videoService: typeof Video,
    private sequelize: Sequelize
  ) {}
  async create(createVideoDto: CreateVideoDto) {
    const { categories, tags } = createVideoDto;
    delete createVideoDto.categories;
    delete createVideoDto.tags;
    // @ts-ignore
    const video = await this.videoService.create(createVideoDto);
    await video.$set('tags', tags, {
      through: () => Tag,
    });
    await video.$set('categories', categories, {
      through: () => Category,
    });
    return video;
  }

  async findAll<M extends Model<Video>>(options?: FindOptions<Attributes<M>>) {
    return this.videoService.findAll(options);
  }

  async findOne(id: number, options?: Omit<FindOptions<Video>, 'where'>) {
    return this.videoService.findByPk(id, options);
  }

  async update(id: number, updateVideoInput: UpdateVideoInput) {
    return this.videoService.update(updateVideoInput, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const user = await this.videoService.findByPk(id);
    await user.destroy();
  }
}
