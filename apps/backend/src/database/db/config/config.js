require("dotenv").config();
const config = {
  development: {
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    host: process.env['DB_HOST'],
    dialect: process.env['DB_DIALECT'],
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

module.exports = config;
