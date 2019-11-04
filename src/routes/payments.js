const express = require('express');
const paymentRouter = express.Router();
const { paymentController } = require('../controllers/index');

paymentRouter.get('/', paymentController.getAll);
paymentRouter.post('/', paymentController.create);

module.exports = paymentRouter;
