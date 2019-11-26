const { logger } = require('../config/logger/pino');

module.exports = (x) => logger.error(x);
