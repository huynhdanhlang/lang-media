import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import User from '../database/models/User';
import Role from '../database/models/Role';
import { RoleModule } from '../role/role.module';

@Module({
  providers: [AuthenticationResolver, AuthenticationService, UserService],
  imports: [UserModule, RoleModule],
})
export class AuthenticationModule {}
