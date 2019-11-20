const { logger } = require("../../config/logger/pino");
const axios = require("axios");
const { mercadopago_sandbox_key } = require("../../config/security/dotenv");
const onErr = require("../../common/onErr");
const {
  userTransactionsModel,
  postulationModel
} = require("../../database/index");

const getMerchantOrderData = orderId => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://api.mercadopago.com/merchant_orders/" +
          orderId +
          "?access_token=" +
          mercadopago_sandbox_key
      )
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

const getPaymentData = paymentId => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://api.mercadopago.com/v1/payments/" +
          paymentId +
          "?access_token=" +
          mercadopago_sandbox_key
      )
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
};
//
const updatePostulationState = (postulationId, paymentStatus) => {
  postulationModel.update(
    { payStatus: paymentStatus },
    { where: { id: postulationId } }
  );
};

const updateTransactionState = (preferenceId, paymentStatus) => {
  userTransactionsModel.update(
    { state: paymentStatus },
    { where: { preferenceId: preferenceId } }
  );
};

const finishTransaction = (preferenceId, paymentStatus, postulationId) => {
  updatePostulationState(postulationId, paymentStatus);
  updateTransactionState(preferenceId, paymentStatus);
};

const transformMercadopagoStatus = mercadopagoStatus => {
  let dbStatus = 0;
  switch (mercadopagoStatus) {
    case "in_process":
      dbStatus = 1;
      break;
    case "approved":
      dbStatus = 2;
      break;
    case "rejected":
      dbStatus = 3;
      break;
  }
  return dbStatus;
};

const manageMerchantOrder = (payment, order) => {
  const dbStatus = transformMercadopagoStatus(payment.status);
  finishTransaction(order.preference_id, dbStatus, payment.external_reference);
};

const managePaymentTransaction = payment => {
  const merchantOrder = getMerchantOrderData(payment.order.id);
  merchantOrder
    .then(order => manageMerchantOrder(payment, order))
    .catch(err => onErr(err));
};
//fundamental

const handlePaymentNotification = paymentId => {
  const paymentData = getPaymentData(paymentId);
  paymentData
    .then(payment => managePaymentTransaction(payment))
    .catch(err => onErr(err));
};
//fundamental
const handleChargebackNotification = chargeback =>
  logger.info("chargebackId: " + chargeback);

//revisar
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
