const axios = require('axios');
const {
  MercadoPago,
  defaultPreferenceMaker,
} = require('../config/mercadoPago/mercadoPago');
const payerMaker = require('../common/mercadopago/payer');
const itemMaker = require('../common/mercadopago/items');
const { mercadopago_sandbox_key } = require('../config/security/dotenv');

function getMerchantOrderData(orderId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.mercadopago.com/merchant_orders/${orderId}?access_token=${mercadopago_sandbox_key}`,
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function getChargeBackData(chargeBackId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.mercadopago.com/v1/chargebacks/${chargeBackId}?access_token=${mercadopago_sandbox_key}`,
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

function getPaymentData(paymentId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${mercadopago_sandbox_key}`,
      )
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });
}

function smartCheckoutGenerator(preferences) {
  return new Promise((resolve, reject) => {
    MercadoPago.preferences
      .create(preferences)
      .then((result) => resolve(result))
      .catch((e) => reject(e));
  });
}

function createPayer(userData) {
  payerMaker(
    userData.name,
    userData.lastName || '',
    userData.email,
    {},
    {},
    {},
    null,
  );
}

function createItem(itemData) {
  itemMaker(
    itemData.id,
    itemData.title,
    itemData.description,
    itemData.picture_url || '',
    itemData.items_category.name,
    itemData.items_currency.name,
    itemData.items_currency.quantity || 1,
    itemData.unitPrice,
  );
}

const transformMercadoPagoStatus = (mercadoPagoStatus) => {
  let dbStatus = 0;
  switch (mercadoPagoStatus) {
    case 'approved':
      dbStatus = 1;
      break;
    case 'in_process':
      dbStatus = 2;
      break;
    case 'rejected':
      dbStatus = 3;
      break;
  }
  return dbStatus;
};

const mercadoPagoModule = {
  getChargeBackData,
  transformMercadoPagoStatus,
  getPaymentData,
  getMerchantOrderData,
  smartCheckoutGenerator,
  createPayer,
  defaultPreferenceMaker,
  createItem,
};

module.exports = Object.freeze(mercadoPagoModule);
