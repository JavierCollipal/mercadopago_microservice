const { paymentService } = require("../services/index");
const { dataResponse } = require("../common/response");

const paymentController = {
  handleMercadoPagoNotification(req, res) {
    console.log(req.query);
    res.sendStatus(201);
    paymentService.handleMercadoPagoNotification(req.query.id,req.query.topic || req.query.type, req.body);
  },
};

module.exports = Object.freeze(paymentController);
