import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  providers: [
    AuthenticationResolver,
    AuthenticationService,
    UserService,
    LocalStrategy,
    JwtStrategy,
  ],
  imports: [
    UserModule,
    RoleModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('NX_JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('NX_JWT_EXPIRATION_TIME')}s`,
        },
      }),
    }),
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
