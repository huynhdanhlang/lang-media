import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import Category from './Category';
import Tag from './Tag';
import VideoCategory from './VideoCategory';
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

  @Column({ type: DataType.STRING, allowNull: false })
  public language: string;

  @Column({ type: DataType.STRING, allowNull: false })
  public country: string;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  public view: number;

  @BelongsToMany(() => Category, () => VideoCategory)
  public category: Category[];

  @HasMany(() => Tag)
  public tag: Tag[];
}
