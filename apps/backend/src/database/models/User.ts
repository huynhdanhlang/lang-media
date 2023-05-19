import {
    Column,
    DataType,
    HasMany,
    HasOne,
    IsEmail,
    Model,
    Table,
  } from "sequelize-typescript";  
  @Table({
    timestamps: true,
    tableName: "users",
  })
  export default class Users extends Model {
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    public username!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    public password!: string;
  
    @Column({ type: DataType.STRING, allowNull: false })
    public fullname!: string;
  
    @IsEmail
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    public email!: string;
  
    @Column({ type: DataType.STRING, allowNull: true })
    public address?: string;
  
    @Column({ type: DataType.STRING, allowNull: true })
    public phone?: string;
  }