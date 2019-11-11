const { paymentService } = require("../services/index");

const paymentController = {
  handleMercadoPagoNotification(req, res) {
    paymentService.handleMercadoPagoNotification(req);
    res.sendStatus(201);
  },
};

module.exports = Object.freeze(paymentController);
