import { Request } from 'express';
import { UserEntity } from '../../user/entities/user.entity';

export interface requestWithUser extends Request {
  user: UserEntity;
}
