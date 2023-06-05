import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { VideoService } from './video.service';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { VideoEntity } from './entities/video.entity';
import JwtAuthenticationGuard from '../authentication/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { TagEntity } from '../tag/entities/tag.entity';
import { TagService } from '../tag/tag.service';
import Video from '../database/models/Video';
import Role from '../database/models/Role';
import Tag from '../database/models/Tag';

@Resolver(() => VideoEntity)
export class VideoResolver {
  constructor(
    private readonly videoService: VideoService,
    private tagService: TagService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Mutation(() => VideoEntity)
  createVideo(@Args('createVideoInput') createVideoInput: CreateVideoInput) {
    return this.videoService.create(createVideoInput);
  }

  @Query(() => [VideoEntity],{ nullable: true })
  findAllVideo() {
    return this.videoService.findAll();
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
