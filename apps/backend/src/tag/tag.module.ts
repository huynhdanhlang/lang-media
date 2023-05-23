import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Tag from '../database/models/Tag';

@Module({
  providers: [TagResolver, TagService],
  imports: [SequelizeModule.forFeature([Tag])]
})
export class TagModule {}
