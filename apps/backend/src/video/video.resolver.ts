import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VideoService } from './video.service';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { VideoEntity } from './entities/video.entity';
import JwtAuthenticationGuard from '../authentication/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => VideoEntity)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Mutation(() => VideoEntity)
  createVideo(@Args('createVideoInput') createVideoInput: CreateVideoInput) {
    return this.videoService.create(createVideoInput);
  }

  @Query(() => [VideoEntity])
  findAllVideo() {
    return this.videoService.findAll();
  }

  @Query(() => VideoEntity)
  findOneVideo(@Args('id', { type: () => Int }) id: number) {
    return this.videoService.findOne(id);
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
