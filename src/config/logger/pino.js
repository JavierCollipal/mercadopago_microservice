const pino = require('pino');
const { log_level } = require('../security/dotenv');

const logger = pino({
  level: log_level,
  prettyPrint: { colorize: true },
});

module.exports = logger;
