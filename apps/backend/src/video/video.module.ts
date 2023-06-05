import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoResolver } from './video.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Video from '../database/models/Video';
import { TagModule } from '../tag/tag.module';

@Module({
  providers: [VideoResolver, VideoService],
  imports: [SequelizeModule.forFeature([Video]), TagModule],
  exports: [SequelizeModule.forFeature([Video]), VideoService],
})
export class VideoModule {}
