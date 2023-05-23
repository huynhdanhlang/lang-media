import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoResolver } from './video.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Video from '../database/models/Video';

@Module({
  providers: [VideoResolver, VideoService],
  imports: [SequelizeModule.forFeature([Video])],
})
export class VideoModule {}
