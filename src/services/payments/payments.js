const { logger } = require("../../config/logger/pino");
const axios = require("axios");
const { mercadopago_sandbox_key } = require("../../config/security/dotenv");
const onErr = require("../../common/onErr");


const getMercadopagoMerchantOrder = orderId => {
  return axios.get("https://api.mercadopago.com/merchant_orders/" + orderId + "?access_token=" + mercadopago_sandbox_key)
    .then(res => res.data)
    .catch(onErr);
};

const changePostulationState = (postulationId, paymentStatus) => {
};

const finishTransaction = (payment, preferenceId, paymentStatus) => {
  logger.info("entro a la funcion finishTransaction");
  logger.info(payment);
  logger.info(preferenceId);
  logger.info(paymentStatus);
};

const transformMercadopagoStatus = mercadopagoStatus => {
  logger.info("entro a la funcion transformMercadopagoStatus");
  let dbStatus = 0;
  switch (mercadopagoStatus) {
    case "APRO":
      dbStatus = 1;
      break;
    case "CONT":
      dbStatus = 2;
      break;
    default:
      dbStatus = 3;
      break;
  }
  return dbStatus;
};

const manageMerchantOrder = (payment, order) => {
  logger.info("entro a la funcion manageMerchantOrder");
  const dbStatus = transformMercadopagoStatus(payment.status);
  finishTransaction(payment.id, order.preference_id, dbStatus);
};

const managePaymentTransaction = payment => {
  logger.info("entro a la funcion managePaymentTransaction");
  const merchantOrder = getMercadopagoMerchantOrder(payment.order.id);
  logger.info("obtuvo la merchant order");
  logger.info(JSON.stringify(merchantOrder));
  merchantOrder.then(order => manageMerchantOrder(payment, order));
};
//fundamental
const handlePaymentNotification = payment => {
  logger.info("entro a la funcion handlePaymentNotification");
  axios.get("https://api.mercadopago.com/v1/payments/" + payment + "?access_token=" + mercadopago_sandbox_key)
    .then(response => managePaymentTransaction(response.data))
    .catch(onErr);
};
//fundamental
const handleChargebackNotification = chargeback => logger.info("chargebackId: " + chargeback);

//revisar
const handleMerchantOrderNotification = merchantOrder => logger.info("merchantOrderId:" + merchantOrder);

const handleMercadoPagoNotification = (notificationId, notificationType) => {
  logger.info("entro a la funcion handleMercadoPagoNotification");
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
