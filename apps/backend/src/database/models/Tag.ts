import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import Video from './Video';
import TagVideo from './TagVideo';
@Table({
  timestamps: true,
  tableName: 'tag',
  deletedAt: true,
})
export default class Tag extends Model<Tag> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @BelongsToMany(() => Video, {
    through: () => TagVideo,
    as: 'videos',
  })
  videos: Video[];
}
