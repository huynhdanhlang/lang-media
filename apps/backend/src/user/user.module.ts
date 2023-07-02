import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import User from '../database/models/User';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import Role from '../database/models/Role';

@Module({
  providers: [UserResolver, UserService, RoleService],
  imports: [SequelizeModule.forFeature([User]), RoleModule],
  exports: [UserService, SequelizeModule.forFeature([User])],
})
export class UserModule {}
