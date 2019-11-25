const { logger } = require("../../config/logger/pino");
const onErr = require("../../common/onErr");
const postulationTransactionModule = require("../../modules/postulationTransaction");
const companyUserTransactionModule = require("../../modules/companyUserTransactions");
const mercadoPagoModule = require("../../modules/mercadopago");
const postulationModule = require("../../modules/postulations");

const finishTransactions = (preferenceId, paymentStatus, postulationId) => {
  const transaction = companyUserTransactionModule.findTransactionWithPreferenceId(preferenceId);
  transaction
    .then(transaction => {
      postulationTransactionModule.createTransaction(postulationId, transaction.id);
    })
    .catch(onErr);

  postulationModule.updatePostulationState(postulationId, paymentStatus);
  companyUserTransactionModule.updateTransactionState(preferenceId, paymentStatus);
};

const manageMerchantOrder = (payment, order) => {
  const dbStatus = mercadoPagoModule.transformMercadopagoStatus(payment.status);
  finishTransactions(order.preference_id, dbStatus, payment.external_reference);
};

const managePaymentTransaction = payment => {
  const merchantOrder = mercadoPagoModule.getMerchantOrderData(payment.order.id);
  merchantOrder.then(order => manageMerchantOrder(payment, order)).catch(err => onErr(err));
};

const managePaymentNotification = paymentId => {
  const paymentData = mercadoPagoModule.getPaymentData(paymentId);
  paymentData.then(payment => managePaymentTransaction(payment)).catch(onErr);
};

const handleChargeBackNotification = chargeBack => {
  logger.info("chargebackId: " + chargeBack);
  const data = mercadoPagoModule.getChargeBackData(chargeBack);

};

const handleMerchantOrderNotification = merchantOrder =>
  logger.info("merchantOrderId:" + merchantOrder);

const handleMercadoPagoNotification = (notificationId, notificationType) => {
  switch (notificationType) {
    case "payment":
      managePaymentNotification(notificationId);
      break;
    case "chargeback":
      handleChargeBackNotification(notificationId);
      break;
    case "merchant_order":
      handleMerchantOrderNotification(notificationId);
      break;
  }
};

module.exports = { handleMercadoPagoNotification };
