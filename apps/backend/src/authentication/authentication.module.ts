import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  providers: [
    AuthenticationResolver,
    AuthenticationService,
    UserService,
    LocalStrategy,
  ],
  imports: [UserModule, RoleModule],
})
export class AuthenticationModule {}
