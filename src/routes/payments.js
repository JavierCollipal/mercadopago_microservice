const express = require('express');
const paymentRouter = express.Router();
const { paymentController } = require('../controllers/index');

paymentRouter.post('/notifications', paymentController.handleMercadoPagoNotification);

module.exports = paymentRouter;
