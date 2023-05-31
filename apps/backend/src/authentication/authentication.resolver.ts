import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { LoginInput } from './dto/login.input';
import { UserEntity } from '../user/entities/user.entity';

@Resolver(() => UserEntity)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => UserEntity)
  async login(
    @Args('loginInput')
    loginInput: LoginInput
  ) {
    const { password, username } = loginInput;
    return this.authenticationService.getAuthenticatedUser(username, password);
  }
}
