const logger = require('../config/logger/pino');
const onErr = require('../common/onErr');
const postulationTransactionModule = require('../modules/postulationTransaction');
const companyUserTransactionModule = require('../modules/companyUserTransactions');
const mercadoPagoModule = require('../modules/mercadopago');
const postulationModule = require('../modules/postulations');

const finishTransactions = (paymentStatus, postulationId) => {
  logger.info(
    `esta postulationId llego a finish transactions: ${postulationId}`,
  );
  const postulationTransaction = postulationTransactionModule.findByPostulationId(
    postulationId,
  );

  postulationTransaction
    .then((transaction) => {
      postulationTransactionModule.updateTransactionState(
        transaction.transactionId,
        paymentStatus,
      );
      companyUserTransactionModule.updateTransactionState(
        transaction.transactionId,
        paymentStatus,
      );
    })
    .catch(onErr);
};

const managePaymentTransaction = (payment) => {
  const dbStatus = mercadoPagoModule.transformMercadoPagoStatus(payment.status);
  postulationModule.updatePostulationState(
    payment.external_reference,
    dbStatus,
  );
  finishTransactions(dbStatus, payment.external_reference);
};

const managePaymentNotification = (paymentId) => {
  const paymentData = mercadoPagoModule.getPaymentData(paymentId);
  paymentData.then((payment) => managePaymentTransaction(payment)).catch(onErr);
};

const handleChargeBackNotification = (chargeBackId) => {
  logger.info(`chargebackId: ${chargeBack}`);
  const chargeBack = mercadoPagoModule.getChargeBackData(chargeBackId);
};

const handleMerchantOrderNotification = () => {};

const handleMercadoPagoNotification = (notificationId, notificationType) => {
  switch (notificationType) {
    case 'payment':
      managePaymentNotification(notificationId);
      break;
    case 'chargeback':
      handleChargeBackNotification(notificationId);
      break;
    case 'merchant_order':
      handleMerchantOrderNotification();
      break;
  }
};

module.exports = { handleMercadoPagoNotification };
