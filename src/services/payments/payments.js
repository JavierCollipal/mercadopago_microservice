const { logger } = require("../../config/logger/pino");
const onErr = require("../../common/onErr");
const postulationTransactionModule = require("../../modules/postulationTransaction");
const companyUserTransactionModule = require("../../modules/companyUserTransactions");
const mercadoPagoModule = require("../../modules/mercadopago");
const postulationModule = require("../../modules/postulations");

const finishTransactions = (paymentStatus, postulationId) => {
  const postulationTransaction = postulationTransactionModule.findByPostulationId(postulationId);

  postulationTransaction
    .then(transaction => {
      if (paymentStatus === 1)
        postulationTransactionModule.updateTransactionState(transaction.id, paymentStatus);
      companyUserTransactionModule.updateTransactionState(transaction.id, paymentStatus);
      logger.info("finalizo la transaccion con transactionId : " + transaction.id);
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
