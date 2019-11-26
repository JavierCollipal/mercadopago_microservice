const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: 'payments API microservice',
      version: '0.0.1',
      description: '',
    },
    basePath: '/',
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ['./**/*.yaml'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
