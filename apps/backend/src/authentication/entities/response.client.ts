import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ObjectMessage {
  message: string;
  @Field(() => Int, { defaultValue: 200 })
  statusCode?: number;
}
