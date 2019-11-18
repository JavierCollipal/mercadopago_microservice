const { paymentService } = require("../services/index");
const { dataResponse } = require("../common/response");

const paymentController = {
  handleMercadoPagoNotification(req, res) {
    console.log(req.query);
    paymentService.handleMercadoPagoNotification(req.query.id || req.query.data.id,
      req.query.topic || req.query.type, req.body);
    res.sendStatus(201);
  },
};

module.exports = Object.freeze(paymentController);
