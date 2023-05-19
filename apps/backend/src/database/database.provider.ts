import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import User from './models/User';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class DatabaseService {
  constructor(
    private configService: ConfigService,
  ) {}
}
