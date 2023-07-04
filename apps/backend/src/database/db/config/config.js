const { resolve } = require('path');

require('dotenv').config({
  path: resolve('apps/backend/.env'),
});
const config = {
  development: {
    username: process.env['NX_DB_USERNAME'],
    password: process.env['NX_DB_PASSWORD'],
    database: process.env['NX_DB_NAME'],
    host: process.env['NX_DB_HOST'],
    dialect: process.env['NX_DB_DIALECT'],
    logging: true,
    // dialectOptions: {
    //   ssl: true,
    // },
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
module.exports = config;
