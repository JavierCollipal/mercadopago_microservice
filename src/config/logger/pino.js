const pino = require('pino');
const expressPino = require('express-pino-logger');
const { log_level } = require('../security/dotenv');

const logger = pino({
  level: log_level,
  prettyPrint: { colorize: true },
});
const expressLogger = expressPino({ logger });

module.exports = {
  logger,
  expressLogger,
};