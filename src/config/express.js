const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./security/rateLimiter');
const { expressLogger } = require('./logger/pino');

module.exports = (app, express) => {
  app.use(cors());
  app.use(helmet());
  app.use(rateLimiter);
  app.use(expressLogger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};