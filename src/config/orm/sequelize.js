const SequelizeLibrary = require('sequelize');
const logger = require('../logger/pino');
const {
  database,
  database_host,
  database_password,
  database_port,
  database_username,
  database_schema,
  sequelize_dialect,
} = require('../security/dotenv');

const sequelizeConfig = {
  host: database_host,
  dialect: sequelize_dialect,
  port: database_port,
  schema: database_schema,
  logging: logger.debug,
};

logger.info('Connecting to woorkit DB with Sequelize');

const sequelizeInstance = new SequelizeLibrary(
  database,
  database_username,
  database_password,
  sequelizeConfig,
);

logger.info('Connection succesful to woorkit DB with Sequelize');
module.exports = {
  sequelizeInstance,
  SequelizeLibrary,
};
