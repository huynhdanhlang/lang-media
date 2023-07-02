import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import JwtAuthenticationGuard from '../authentication/guard/jwt.guard';
import { CategoryEntity } from '../category/entities/category.entity';
import Category from '../database/models/Category';
import Tag from '../database/models/Tag';
import { TagEntity } from '../tag/entities/tag.entity';
import { TagService } from '../tag/tag.service';
import { TeleClientService } from '../tele-client/tele-client.service';
import { CreateVideoDto } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { VideoFilter } from './dto/video-filter.input';
import { VideoEntity } from './entities/video.entity';
import { VideoService } from './video.service';
@Resolver(() => VideoEntity)
export class VideoResolver {
  constructor(
    private readonly videoService: VideoService,
    private tagService: TagService,
    // private teleService: TeleClientService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Mutation(() => VideoEntity)
  async createVideo(@Args('createVideoDto') createVideoDto: CreateVideoDto) {
    return await this.videoService.create(createVideoDto);
  }

  @Query(() => [VideoEntity], { nullable: true })
  findAllVideo(
    @Args('videoFilter', {
      nullable: true,
    })
    videoFilter?: VideoFilter
  ) {
    // @ts-ignore
    return this.videoService.findAll({ ...videoFilter });
  }

  @Query(() => VideoEntity, { nullable: true })
  findOneVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.findOne(id);
  }

  @ResolveField(() => TagEntity, { nullable: true })
  async tags(@Parent() parent: VideoEntity) {
    const { id } = parent;
    const video = await this.videoService.findOne(id, {
      include: Tag,
    });
    return video.tags;
  }

  @ResolveField(() => CategoryEntity, { nullable: true })
  async categories(@Parent() parent: VideoEntity) {
    const { id } = parent;
    const video = await this.videoService.findOne(id, {
      include: Category,
    });
    return video.categories;
  }

  @UseGuards(new JwtAuthenticationGuard('videoFilter'))
  @Mutation(() => VideoEntity)
  updateVideo(@Args('updateVideoInput') updateVideoInput: UpdateVideoInput) {
    return this.videoService.update(updateVideoInput.id, updateVideoInput);
  }

  @UseGuards(new JwtAuthenticationGuard('videoFilter'))
  @Mutation(() => VideoEntity)
  removeVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.remove(id);
  }

  @Query(() => [VideoEntity])
  async findAllVideoByCategory(
    @Args('categoryId', { type: () => Int }) categoryId: number
  ) {
    return this.videoService.getVideoByCategory(categoryId);
  }
}
