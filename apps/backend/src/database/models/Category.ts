import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
} from 'sequelize-typescript';
import Video from './Video';
import VideoCategory from './VideoCategory';

@Table({
  timestamps: true,
  tableName: 'category',
  deletedAt: true,
})
export default class Category extends Model<Category> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @BelongsToMany(() => Video, {
    through: () => VideoCategory,
    as: 'videos',
  })
  videos: Video[];
}