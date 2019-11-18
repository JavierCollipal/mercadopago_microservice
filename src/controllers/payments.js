const { paymentService } = require("../services/index");
const { dataResponse } = require("../common/response");

const paymentController = {
  handleMercadoPagoNotification(req, res) {
    console.log(req.query);
    console.log(req.params);
    paymentService.handleMercadoPagoNotification(req.body);
    res.sendStatus(201);
  },
};

module.exports = Object.freeze(paymentController);
