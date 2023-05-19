import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import Video from './Video';

@Table({
  timestamps: true,
  tableName: 'category',
  deletedAt: true,
})
export default class Category extends Model<Category> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public name: string;

  @HasMany(() => Video, 'videoId')
  public video: Video[];

  @Column({ type: DataType.STRING })
  role: string;
}
