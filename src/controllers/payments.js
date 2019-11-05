const { paymentService } = require('../services/index');
const { dataResponse } = require('../common/response');
const { logger } = require('../config/logger/pino');
const paymentController = {

  handleMercadoPagoNotification(req, res) {
    logger.info(req.body);
  },

};

module.exports = paymentController;
