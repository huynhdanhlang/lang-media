import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Category from '../database/models/Category';
import { VideoModule } from '../video/video.module';

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [SequelizeModule.forFeature([Category]), VideoModule],
  exports: [SequelizeModule.forFeature([Category]), CategoryService],
})
export class CategoryModule {}
