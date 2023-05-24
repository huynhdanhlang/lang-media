import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  IsEmail,
  Model,
  Table,
} from 'sequelize-typescript';
import Role from './Role';
import { ROLES } from '../../constant/role.const';
@Table({
  timestamps: true,
  tableName: 'user',
})
export default class User extends Model<User> {
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  fullname: string;

  @IsEmail
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  phone?: string;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
