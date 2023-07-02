import { InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  username: string;
  password: string;
}
