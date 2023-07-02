import { GraphQLExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
import { requestWithUser } from './requestWithUser.interface';

export type GraphQLContext = GraphQLExecutionContext & {
  req: requestWithUser;
  res: Response;
};
