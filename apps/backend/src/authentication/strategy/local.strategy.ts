import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }
  async validate(username: string, password: string) {
    return this.authenticationService.getAuthenticatedUser(username, password);
  }
}
