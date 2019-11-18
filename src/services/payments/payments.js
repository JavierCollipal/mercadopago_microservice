const { logger } = require("../../config/logger/pino");
//fundamental
const handlePaymentNotification = payment => logger.info("paymentId: " +payment);
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
      handleChargebackNotification();
      break;
    case "merchant_order":
      handleMerchantOrderNotification();
      break;
  }
};

module.exports = { handleMercadoPagoNotification };
