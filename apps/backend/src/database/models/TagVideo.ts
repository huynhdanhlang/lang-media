import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import Tag from './Tag';
import Video from './Video';

@Table({
  tableName: 'tag_video',
  timestamps: true,
})
export default class TagVideo extends Model<TagVideo> {
  @ForeignKey(() => Tag)
  @Column
  tagId: number;

  @ForeignKey(() => Video)
  @Column
  videoId: number;
}
