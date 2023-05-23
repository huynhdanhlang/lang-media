import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Category from '../database/models/Category';

@Module({
  providers: [CategoryResolver, CategoryService],
  imports: [SequelizeModule.forFeature([Category])],
})
export class CategoryModule {}
