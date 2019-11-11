const { paymentService } = require("../services/index");
const { dataResponse } = require("../common/response");

const paymentController = {
  handleMercadoPagoNotification(req, res) {
    paymentService.handleMercadoPagoNotification(req);
  },
};

module.exports = Object.freeze(paymentController);
