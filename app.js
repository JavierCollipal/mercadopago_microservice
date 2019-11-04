//requires
const express = require('express');
const routes = require('./src/routes/index');
const appConfig = require('./src/config/express');
const swaggerDoc = require('./src/doc/swaggerDoc');
const app = express();
//express server configuration
appConfig(app, express);
swaggerDoc(app);
routes(app);

module.exports = app;
