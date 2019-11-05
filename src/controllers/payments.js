const { paymentService } = require('../services/index');
const { dataResponse } = require('../common/response');
const paymentController = {
  handleMercadoPagoNotification(req, res) {
    res.sendStatus(201);
  },

};

module.exports = Object.freeze(paymentController);
