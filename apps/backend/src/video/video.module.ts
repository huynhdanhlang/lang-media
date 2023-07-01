import { Module, forwardRef } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoResolver } from './video.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Video from '../database/models/Video';
import { TagModule } from '../tag/tag.module';
// import { TeleClientModule } from '../tele-client/tele-client.module';
import { CategoryModule } from '../category/category.module';
import { R2ClientModule } from '../r2-client/r2-client.module';

@Module({
  providers: [VideoResolver, VideoService],
  imports: [
    SequelizeModule.forFeature([Video]),
    TagModule,
    // TeleClientModule,
    forwardRef(() => CategoryModule),
    forwardRef(() => R2ClientModule),
  ],
  exports: [SequelizeModule.forFeature([Video]), VideoService],
})
export class VideoModule {}
