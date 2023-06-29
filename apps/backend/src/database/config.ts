import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { resolve } from 'path';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { getModels } from './models';
require('dotenv').config({
  path: resolve('apps/backend/.env'),
});
interface SequelizeConfig {
  [key: string]: SequelizeModuleOptions;
}
const config: SequelizeConfig = {
  development: {
    username: process.env['NX_DB_USERNAME'],
    password: process.env['NX_DB_PASSWORD'],
    database: process.env['NX_DB_NAME'],
    host: process.env['NX_DB_HOST'],
    dialect: <Dialect>process.env['NX_DB_DIALECT'],
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
  models: getModels,
  sync: {
    alter: true,
  },
});
console.log(__dirname);

export { sequelize, config };
