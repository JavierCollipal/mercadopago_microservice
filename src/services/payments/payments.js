const { logger } = require("../../config/logger/pino");
const axios = require("axios");
const { mercadopago_sandbox_key } = require("../../config/security/dotenv");
const onErr = require("../../common/onErr");


const getMercadopagoMerchantOrder = orderId => {
  return new Promise((resolve, reject) => {

    axios.get("https://api.mercadopago.com/merchant_orders/" + orderId + "?access_token=" + mercadopago_sandbox_key)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

const changePostulationState = (postulationId, paymentStatus) => {
};

const finishTransaction = (preferenceId, paymentStatus) => {
  logger.info("entro a la funcion finishTransaction");
  logger.info("id de preferencia: " + preferenceId);
  logger.info("estado del pago para nuestra db: " + paymentStatus);
};

const transformMercadopagoStatus = mercadopagoStatus => {
  logger.info("entro a la funcion transformMercadopagoStatus");
  logger.info(mercadopagoStatus);
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
  finishTransaction(order.preference_id, dbStatus);
};

const managePaymentTransaction = payment => {
  logger.info("entro a la funcion managePaymentTransaction");
  const merchantOrder = getMercadopagoMerchantOrder(payment.order.id);
  merchantOrder
    .then(order => manageMerchantOrder(payment, order));
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
