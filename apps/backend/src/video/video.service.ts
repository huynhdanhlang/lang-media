import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Attributes, FindOptions, Model, Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { CategoryService } from '../category/category.service';
import Category from '../database/models/Category';
import Tag from '../database/models/Tag';
import Video from '../database/models/Video';
import { checkIsExisted } from '../helper/model';
import { R2ClientService } from '../r2-client/r2-client.service';
import { CreateVideoDto } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private videoService: typeof Video,
    private categoryService: CategoryService,
    private sequelize: Sequelize,
    private r2ClientService: R2ClientService
  ) {}
  async create(createVideoDto: CreateVideoDto) {
    const { categories, tags, name } = createVideoDto;
    const isExisted = await checkIsExisted({
      service: this.videoService,
      where: {
        name,
      },
    });
    if (isExisted) {
      throw new BadRequestException({
        message: 'Video đã tồn tại',
      });
    }
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
    if (options.where?.['name']) {
      options.where['name'] = {
        [Op.like]: `%${options.where['name']}%`,
      };
    }
    
    let whereToQuery = {
      ...options.where,
      url: {
        [Op.ne]: null,
      },
      trailerUrl: {
        [Op.ne]: null,
      },
      poster: {
        [Op.ne]: null,
      },
    };
    const videos = await this.videoService.findAll({
      ...options,
      where: whereToQuery,
    });
    return await this.getSignedUrlVideo(videos);
  }

  async findOne(id: number, options?: Omit<FindOptions<Video>, 'where'>) {
    const video = await this.videoService.findByPk(id, options);
    return await this.getSignedUrlVideo(video);
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

  private async internalGetSignedUrlVideo<T>(video: T) {
    video['url'] = await this.r2ClientService.getSignedUrl(video['url']);
    video['poster'] = await this.r2ClientService.getSignedUrl(video['poster']);
    // video['trailerUrl'] = await this.r2ClientService.getSignedUrl(
    //   video['trailerUrl']
    // );
    return video;
  }

  async getSignedUrlVideo<T>(video: T): Promise<T> {
    if (Array.isArray(video)) {
      const videos = await Promise.all(
        video.map(async (video) => {
          return await this.internalGetSignedUrlVideo(video);
        })
      );
      return <T>videos;
    }
    return await this.internalGetSignedUrlVideo(video);
  }

  async getVideoByCategory(categoryId: number) {
    const category = await this.categoryService.findOne(categoryId, {
      include: Video,
    });
    return await this.getSignedUrlVideo(category.videos);
  }
}
