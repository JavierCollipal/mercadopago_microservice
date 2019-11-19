const { paymentService } = require("../services/index");
const { dataResponse } = require("../common/response");

const paymentController = {
  handleMercadoPagoNotification(req, res) {
    res.sendStatus(201);
    paymentService.handleMercadoPagoNotification(req.query.id || req.query['data.id']
      ,req.query.topic || req.query.type, req.body);
  },
};

module.exports = Object.freeze(paymentController);
