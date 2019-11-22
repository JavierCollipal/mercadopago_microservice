const { logger } = require("../../config/logger/pino");
const onErr = require("../../common/onErr");
const postulationTransactionModule = require("../../modules/postulationTransaction");
const companyUserTransactionModule = require("../../modules/companyUserTransactions");
const mercadoPagoModule = require("../../modules/mercadopago");
const postulationModule = require("../../modules/postulations");

const finishTransactions = (paymentStatus, postulationId) => {
  logger.info("esta postulationId llego a finish transactions: " + postulationId);
  const postulationTransaction = postulationTransactionModule.findByPostulationId(postulationId);

  postulationTransaction
    .then(transaction => {
      logger.info("updateando transacciones con el nuevo estado: " + paymentStatus);
      postulationTransactionModule.updateTransactionState(transaction.transactionId, paymentStatus);
      companyUserTransactionModule.updateTransactionState(transaction.transactionId, paymentStatus);
      logger.info("finalizo la transaccion con transactionId : " + transaction.transactionId);
    })
    .catch(onErr);
};

const managePaymentTransaction = payment => {
  const dbStatus = mercadoPagoModule.transformMercadopagoStatus(payment.status);
  postulationModule.updatePostulationState(payment.external_reference, dbStatus);
  finishTransactions(dbStatus, payment.external_reference);
};

const handlePaymentNotification = paymentId => {
  const paymentData = mercadoPagoModule.getPaymentData(paymentId);
  paymentData.then(payment => managePaymentTransaction(payment)).catch(err => onErr(err));
};

const handleChargebackNotification = chargeback => logger.info("chargebackId: " + chargeback);

const handleMerchantOrderNotification = merchantOrder =>
  logger.info("merchantOrderId:" + merchantOrder);

const handleMercadoPagoNotification = (notificationId, notificationType) => {
  switch (notificationType) {
    case "payment":
      handlePaymentNotification(notificationId);
      break;
    case "chargeback":
      handleChargebackNotification(notificationId);
      break;
    case "merchant_order":
      handleMerchantOrderNotification(notificationId);
      break;
  }
};

module.exports = { handleMercadoPagoNotification };
