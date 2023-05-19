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
import User from './User';
@Table({
  timestamps: true,
  tableName: 'videouser',
  deletedAt: true,
})
export default class VideoUser extends Model<VideoUser> {
  @BelongsTo(() => User)
  public user: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  public userId: number;

  @BelongsTo(() => Video)
  public video: Video;

  @ForeignKey(() => Video)
  @Column({ type: DataType.INTEGER })
  public videoId: number;
}
