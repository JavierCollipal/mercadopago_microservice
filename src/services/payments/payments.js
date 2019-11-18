const { logger } = require("../../config/logger/pino");
//fundamental
const handlePaymentNotification = payment => logger.info("payment notifications appears" +payment);
//fundamental
const handleChargebackNotification = () => logger.info("its time to deal with chargebacks");

//revisar
const handleMerchantOrderNotification = () => logger.info("its time to deal with Merchant Orders");

const handleMercadoPagoNotification = (notificationId, notificationType, notificationBody) => {

  logger.info("Id of notification: " + notificationId);
  logger.info("topic of notification: " + notificationType);
  logger.info("body of notification: " + JSON.parse(notificationBody));
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
