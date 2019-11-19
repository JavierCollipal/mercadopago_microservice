const { logger } = require("../../config/logger/pino");
const axios = require("axios");
const { mercadopago_sandbox_key } = require("../../config/security/dotenv");
const onErr = require("../../common/onErr");


const getMercadopagoMerchantOrder = orderId => {
  return axios.get("https://api.mercadopago.com/merchant_orders/" + orderId + "?access_token=" + mercadopago_sandbox_key)
    .then(res => res.body)
    .catch(onErr);
};

const changePostulationState = (postulationId, paymentStatus) => {
};

const finishTransaction = (payment, preferenceId, paymentStatus) => {
  logger.info(payment);
  logger.info(preferenceId);
};
const transformMercadopagoStatus = mercadopagoStatus => {
  const dbStatus = 0;
  switch (mercadopagoStatus) {
    case 1:

      break;
    case 2:

      break;
    case 3:

      break;
    default:

      break;
  }
  return dbStatus;
};
const managePaymentTransaction = payment => {
  const merchantOrder = getMercadopagoMerchantOrder(payment.order.id);
  logger.info(merchantOrder);
  finishTransaction(payment.id, merchantOrder.id, payment.status);
};
//fundamental
const handlePaymentNotification = payment => {
  axios.get("https://api.mercadopago.com/v1/payments/" + payment + "?access_token=" + mercadopago_sandbox_key)
    .then(response => managePaymentTransaction(response.body))
    .catch(onErr);
};
//fundamental
const handleChargebackNotification = chargeback => logger.info("chargebackId: " + chargeback);

//revisar
const handleMerchantOrderNotification = merchantOrder => logger.info("merchantOrderId:" + merchantOrder);

const handleMercadoPagoNotification = (notificationId, notificationType, notificationBody) => {

  logger.info("Id of notification: " + notificationId);
  logger.info("topic of notification: " + notificationType);
  logger.info("body of notification: " + JSON.stringify(notificationBody));
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
