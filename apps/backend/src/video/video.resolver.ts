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
import { CreateVideoDto } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { VideoEntity } from './entities/video.entity';
import JwtAuthenticationGuard from '../authentication/guard/jwt.guard';
import { UseGuards } from '@nestjs/common';
import { TagEntity } from '../tag/entities/tag.entity';
import { TagService } from '../tag/tag.service';
import Tag from '../database/models/Tag';
import { VideoFilter } from './dto/video-filter.input';
import { TeleClientService } from '../tele-client/tele-client.service';

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
    const {
      posterImage,
      video,
      trailerVideo,
      country,
      description,
      name,
      language,
    } = createVideoDto;
    console.log(
      '🚀 ~ file: video.resolver.ts:34 ~ VideoResolver ~ country,description,name,language:',
      country,
      description,
      name,
      language
    );
    const {
      createReadStream: createReadStreamPoster,
      encoding: encodingPoster,
      filename: filenamePoster,
      mimetype: mimetypePoster,
    } = await posterImage;
    console.log(
      '🚀 ~ file: video.resolver.ts:40 ~ VideoResolver ~ mimetypePoster:',
      mimetypePoster
    );
    const {
      createReadStream: createReadStreamVideo,
      encoding: encodingVideo,
      filename: filenameVideo,
      mimetype: mimetypeVideo,
    } = await video;
    console.log(
      '🚀 ~ file: video.resolver.ts:47 ~ VideoResolver ~ mimetypeVideo:',
      mimetypeVideo
    );
    const {
      createReadStream: createReadStreamTrailer,
      encoding: encodingTrailer,
      filename: filenameTrailer,
      mimetype: mimetypeTrailer,
    } = await trailerVideo;
    console.log(
      '🚀 ~ file: video.resolver.ts:75 ~ VideoResolver ~ mimetypeTrailer:',
      mimetypeTrailer
    );
    console.log(
      '🚀 ~ file: video.resolver.ts:75 ~ VideoResolver ~ filenameTrailer:',
      filenameTrailer
    );
    console.log(
      '🚀 ~ file: video.resolver.ts:75 ~ VideoResolver ~ encodingTrailer:',
      encodingTrailer
    );
    console.log(
      '🚀 ~ file: video.resolver.ts:54 ~ VideoResolver ~ mimetypeTrailer:',
      mimetypeTrailer
    );

    console.log(createReadStreamTrailer());

    const message_id = await this.teleService.uploadFile(
      createReadStreamTrailer(),
      filenameTrailer
    );
    return message_id;
    // return this.videoService.create({});
  }

  @UseGuards(JwtAuthenticationGuard)
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
