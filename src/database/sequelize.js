const sequelizeLibrary = require("sequelize");
const { logger } = require("../config/logger/pino");
const {
  database,
  database_host,
  database_password,
  database_port,
  database_username,
  database_schema,
  sequelize_dialect,
} = require("../config/security/dotenv");

//for production
logger.info("Connecting to woorkit DB with Sequelize");
const sequelizeInstance = new sequelizeLibrary(database, database_username, database_password, {
  host: database_host,
  dialect: sequelize_dialect,
  port: database_port,
  schema: database_schema,
  logging: logger.debug,
});

logger.info("Connection sucefull to woorkit DB with Sequelize");
module.exports = {
  sequelizeInstance,
  sequelizeLibrary,
};
