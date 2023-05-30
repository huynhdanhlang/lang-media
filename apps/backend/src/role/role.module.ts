import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Role from '../database/models/Role';

@Module({
  providers: [RoleResolver, RoleService],
  imports: [SequelizeModule.forFeature([Role])],
  exports: [RoleService],
})
export class RoleModule {}
