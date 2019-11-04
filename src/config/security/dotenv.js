const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  database: process.env.DATABASE,
  database_username: process.env.DATABASE_USERNAME,
  database_password: process.env.DATABASE_PASSWORD,
  database_host: process.env.DATABASE_HOST,
  database_port: process.env.DATABASE_PORT,
  rabbit_host: process.env.RABBIT_HOST,
  rabbit_port: process.env.RABBIT_PORT,
  rabbit_username: process.env.RABBITMQ_USERNAME,
  rabbit_password: process.env.RABBITMQ_PASSWORD,
  database_schema: process.env.DATABASE_SCHEMA,
  server_port: process.env.SERVER_PORT,
  sequelize_dialect: process.env.SEQUELIZE_DIALECT,
  log_level: process.env.LOG_LEVEL,
};
