import {
  Column,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import Video from './Video';
import Category from './Category';
@Table({
  tableName: 'video_category',
  indexes: [
    {
      unique: true,
      fields: ['videoId', 'categoryId'],
    },
  ],
})
export default class VideoCategory extends Model<VideoCategory> {
  @ForeignKey(() => Category)
  @Column
  categoryId: number;

  @ForeignKey(() => Video)
  @Column
  videoId: number;
}
