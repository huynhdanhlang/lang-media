import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import User from './User';

@Table({
  tableName: 'role',
})
export default class Role extends Model<Role> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  name: string;

  @HasMany(() => User)
  users: User[];
}
