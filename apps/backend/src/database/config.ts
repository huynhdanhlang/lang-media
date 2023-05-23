import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { resolve } from 'path';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
require('dotenv').config();
interface SequelizeConfig {
  [key: string]: SequelizeModuleOptions;
}
const config: SequelizeConfig = {
  development: {
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    host: process.env['DB_HOST'],
    dialect: <Dialect>process.env['DB_DIALECT'],
    logging: true,
    dialectModule: require('pg'),
    timezone: '+07:00',
    pool: {
      max: 20,
      idle: 20000,
      min: 0,
      acquire: 50000,
    },
  },
};
const sequelize = new Sequelize({
  ...config.development,
  models: [resolve(__dirname, 'models', '*.ts')],
});

export { sequelize, config };
