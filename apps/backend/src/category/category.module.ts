import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import Category from '../database/models/Category';
import { VideoModule } from '../video/video.module';
import { VideoService } from '../video/video.service';
import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { R2ClientModule } from '../r2-client/r2-client.module';
@Module({
  providers: [CategoryResolver, CategoryService, VideoService],
  imports: [
    SequelizeModule.forFeature([Category]),
    forwardRef(() => VideoModule),
    forwardRef(() => R2ClientModule),
  ],
  exports: [SequelizeModule.forFeature([Category]), CategoryService],
})
export class CategoryModule {}
