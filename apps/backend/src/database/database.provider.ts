import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class DatabaseService {
  constructor(
    private configService: ConfigService,
    private sequelize: Sequelize
  ) {}

  
}
