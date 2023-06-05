import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  ForeignKey,
  HasMany,
  Default,
} from 'sequelize-typescript';
import Category from './Category';
import Tag from './Tag';
import VideoCategory from './VideoCategory';
import TagVideo from './TagVideo';
@Table({
  timestamps: true,
  tableName: 'video',
  deletedAt: true,
})
export default class Video extends Model<Video> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public url: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  trailerUrl: string;

  @Default('')
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  poster: string;

  @Column({ type: DataType.STRING, allowNull: false })
  language: string;

  @Column({ type: DataType.STRING, allowNull: false })
  country: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  view: number;

  @BelongsToMany(() => Category, {
    through: () => VideoCategory,
    as: 'categories',
  })
  categories: Category[];

  @BelongsToMany(() => Tag, {
    through: () => TagVideo,
    as: 'tags',
  })
  tags: Tag[];
}
