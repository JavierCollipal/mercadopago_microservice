const paymentRoutes = require('./payments');

const apiVersion = '/api/v1';

module.exports = (app) => {
  app.use(`${apiVersion}/payments`, paymentRoutes);
};
