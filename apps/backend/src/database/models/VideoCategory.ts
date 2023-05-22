import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from 'sequelize-typescript';
import Video from './Video';
import Category from './Category';
@Table({
  timestamps: true,
  tableName: 'videoCategory',
  deletedAt: true,
})
export default class VideoCategory extends Model<VideoCategory> {
  @BelongsTo(() => Category)
  public category: Category;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  public categoryId: number;

  @BelongsTo(() => Video)
  public video: Video;

  @ForeignKey(() => Video)
  @Column({ type: DataType.INTEGER })
  public videoId: number;
}
