const express = require('express');

const paymentRouter = express.Router();
const paymentController = require('../controllers/payments.js');

paymentRouter.post(
  '/notifications',
  paymentController.handleMercadoPagoNotification,
);

module.exports = paymentRouter;
