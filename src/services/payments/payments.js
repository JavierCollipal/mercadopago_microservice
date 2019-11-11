const { logger } = require("../../config/logger/pino");
//fundamental
const handlePaymentNotification = payment => logger.info(payment);
//fundamental
const handleChargebackNotification = () => logger.info("its time to deal with chargebacks");

//revisar
const handleMerchantOrderNotification = () => logger.info("its time to deal with Merchant Orders");

const handleMercadoPagoNotification = (notification) => {
  logger.info(notification.body);
  switch (notification.topic) {
    case 1:
      handlePaymentNotification();
      break;
    case 2:
      handleChargebackNotification();
      break;
    case 3:
      handleMerchantOrderNotification();
      break;
  }
};

module.exports = { handleMercadoPagoNotification };
