import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'username',
    });
  }
  async validate(username: string, password: string) {
    console.log("🚀 ~ file: local.strategy.ts:14 ~ LocalStrategy ~ validate ~ password:", password)
    console.log("🚀 ~ file: local.strategy.ts:14 ~ LocalStrategy ~ validate ~ username:", username)
    return this.authenticationService.getAuthenticatedUser(username, password);
  }
}
