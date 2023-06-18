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
import Tag from '../database/models/Tag';
import { TagEntity } from '../tag/entities/tag.entity';
import { TagService } from '../tag/tag.service';
import { TeleClientService } from '../tele-client/tele-client.service';
import { CreateVideoDto } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { VideoFilter } from './dto/video-filter.input';
import { VideoEntity } from './entities/video.entity';
import { VideoService } from './video.service';
import Category from '../database/models/Category';
@Resolver(() => VideoEntity)
export class VideoResolver {
  constructor(
    private readonly videoService: VideoService,
    private tagService: TagService,
    private teleService: TeleClientService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Mutation(() => VideoEntity)
  async createVideo(@Args('createVideoDto') createVideoDto: CreateVideoDto) {
    console.log("🚀 ~ file: video.resolver.ts:33 ~ VideoResolver ~ createVideo ~ createVideoDto:", createVideoDto)
    return await this.videoService.create(createVideoDto);
  }

  @UseGuards(new JwtAuthenticationGuard('videoFilter'))
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
      attributes: [],
    });
    return video.tags;
  }

  @Mutation(() => VideoEntity)
  updateVideo(@Args('updateVideoInput') updateVideoInput: UpdateVideoInput) {
    return this.videoService.update(updateVideoInput.id, updateVideoInput);
  }

  @Mutation(() => VideoEntity)
  removeVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.remove(id);
  }
}
