const { logger } = require("../../config/logger/pino");
const axios = require("axios");
const { mercadopago_sandbox_key } = require("../../config/security/dotenv");
const onErr = require("../../common/onErr");

//fundamental
const handlePaymentNotification = payment => {
  axios.get("https://api.mercadopago.com/v1/payments/" + payment + "?access_token=" + mercadopago_sandbox_key)
    .then(response => logger.info(response))
    .catch(onErr);
  logger.info("paymentId: " + payment);
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
