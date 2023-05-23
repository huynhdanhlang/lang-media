import { Injectable } from '@nestjs/common';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { InjectModel } from '@nestjs/sequelize';
import Video from '../database/models/Video';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video) private videoService: typeof Video) {}
  async create(createVideoInput: CreateVideoInput) {
    return this.videoService.create(createVideoInput);
  }

  async findAll() {
    return this.videoService.findAll();
  }

  async findOne(id: number) {
    return this.videoService.findByPk(id);
  }

  async update(id: number, updateVideoInput: UpdateVideoInput) {
    return this.videoService.update(updateVideoInput, {
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const user = await this.videoService.findByPk(id);
    await user.destroy();
  }
}
