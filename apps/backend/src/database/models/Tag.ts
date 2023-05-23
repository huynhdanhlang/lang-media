import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Video from './Video';
@Table({
  timestamps: true,
  tableName: 'tag',
  deletedAt: true,
})
export default class Tag extends Model<Tag> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @BelongsTo(() => Video)
  video: Video;

  @ForeignKey(() => Video)
  @Column({
    type: DataType.INTEGER,
  })
  videoId: number;
}
