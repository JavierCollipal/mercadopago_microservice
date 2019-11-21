const { MercadoPago, defaultPreferenceMaker } = require("../config/mercadoPago/mercadoPago");
const payerMaker = require("../common/mercadopago/payer");
const itemMaker = require("../common/mercadopago/items");
const axios = require("axios");
const { mercadopago_sandbox_key } = require("../config/security/dotenv");
const { logger } = require("../config/logger/pino");
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

const smartCheckoutGenerator = preferences => {
  return new Promise((resolve, reject) => {
    MercadoPago.preferences
      .create(preferences)
      .then(result => resolve(result))
      .catch(e => reject(e));
  });
};

const createPayer = userData => {
  return payerMaker(userData.name, userData.lastName || "", userData.email, {}, {}, {}, null);
};

const createItem = itemData => {
  logger.info(itemData);
  return itemMaker(
    itemData.id,
    itemData.title,
    itemData.description,
    itemData.picture_url || "",
    itemData.items_category.name,
    itemData.items_currency.name,
    itemData.items_currency.quantity || 1,
    itemData.unitPrice
  );
};

const transformMercadopagoStatus = mercadopagoStatus => {
  let dbStatus = 0;
  switch (mercadopagoStatus) {
    case "approved":
      dbStatus = 1;
      break;
    case "in_process":
      dbStatus = 2;
      break;
    case "rejected":
      dbStatus = 3;
      break;
  }
  return dbStatus;
};

const mercadoPagoModule = {
  transformMercadopagoStatus,
  getPaymentData,
  getMerchantOrderData,
  smartCheckoutGenerator,
  createPayer,
  defaultPreferenceMaker,
  createItem
};

module.exports = Object.freeze(mercadoPagoModule);
