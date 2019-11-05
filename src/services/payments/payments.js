const {logger} = require("../../config/logger/pino");
const handlePaymentNotification = payment => logger.info(payment);

const handleChargebackNotification = () => logger.info("its time to deal with chargebacks");

const handleMerchantOrderNotification = () => logger.info("its time to deal with Merchant Orders");

const handleMercadoPagoNotification = (notification) => {
    console.log(notification);
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
