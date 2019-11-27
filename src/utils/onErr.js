const logger = require('../config/logger/pino');

module.exports = (err) => logger.error(err);
