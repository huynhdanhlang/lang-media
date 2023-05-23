import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.provider';
import { SequelizeModule } from '@nestjs/sequelize';
import { config } from './config';
import { resolve } from 'path';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [
    ConfigModule,
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        ...config.development,
        models: [resolve(__dirname, 'models', '*.ts')],
        synchronize: true,        
      }),
    }),
  ],
})
export class DatabaseModule {}
