import { Injectable } from '@nestjs/common';
import { CreateVideoDto, CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { InjectModel } from '@nestjs/sequelize';
import Video from '../database/models/Video';
import { Attributes, FindOptions, Model } from 'sequelize';
import Tag from '../database/models/Tag';
import Category from '../database/models/Category';
import { Sequelize } from 'sequelize-typescript';
import { CategoryService } from '../category/category.service';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { R2ClientService } from '../r2-client/r2-client.service';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video) private videoService: typeof Video,
    private categroryService: CategoryService,
    private sequelize: Sequelize,
    private r2ClientService: R2ClientService
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

  async getVideoByCategory(categoryId: number) {
    const category = await this.categroryService.findOne(categoryId, {
      include: Video,
    });
    const videos = await Promise.all(
      category.videos.map(async (video) => {
        video.url = await this.r2ClientService.getSignedUrl(video.url);
        video.poster = await this.r2ClientService.getSignedUrl(video.poster);
        video.trailerUrl = await this.r2ClientService.getSignedUrl(
          video.trailerUrl
        );
        return video;
      })
    );
    return videos;
  }
}
