import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoResolver } from './video.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Video from '../database/models/Video';
import { TagModule } from '../tag/tag.module';
import { TeleClientModule } from '../tele-client/tele-client.module';

@Module({
  providers: [VideoResolver, VideoService],
  imports: [SequelizeModule.forFeature([Video]), TagModule, TeleClientModule],
  exports: [SequelizeModule.forFeature([Video]), VideoService],
})
export class VideoModule {}
