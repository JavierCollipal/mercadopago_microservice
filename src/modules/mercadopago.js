const axios = require('axios');
const {
  MercadoPago,
  defaultPreferenceMaker,
} = require('../config/mercadoPago/mercadoPago');
const payerMaker = require('../utils/mercadopago/payer');
const itemMaker = require('../utils/mercadopago/items');
const { mercadopago_sandbox_key } = require('../config/security/dotenv');

const getMerchantOrderData = (orderId) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.mercadopago.com/merchant_orders/${orderId}?access_token=${mercadopago_sandbox_key}`,
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

const getChargeBackData = (chargeBackId) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.mercadopago.com/v1/chargebacks/${chargeBackId}?access_token=${mercadopago_sandbox_key}`,
      )
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });

const getPaymentData = (paymentId) =>
  new Promise((resolve, reject) => {
    axios
      .get(
        `https://api.mercadopago.com/v1/payments/${paymentId}?access_token=${mercadopago_sandbox_key}`,
      )
      .then((response) => resolve(response.data))
      .catch((err) => reject(err));
  });

const smartCheckoutGenerator = (preferences) =>
  new Promise((resolve, reject) => {
    MercadoPago.preferences
      .create(preferences)
      .then((result) => resolve(result))
      .catch((e) => reject(e));
  });

const createPayer = (userData) => {
  payerMaker(
    userData.name,
    userData.lastName || '',
    userData.email,
    {},
    {},
    {},
    null,
  );
};

const createItem = (itemData) =>
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

const createPreference = (user, item, postulationId) => {
  const payer = createPayer(user);
  const formattedItem = createItem(item);
  const items = [];
  items.push(formattedItem);

  return defaultPreferenceMaker(items, payer, postulationId.toString());
};

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
    default:
      break;
  }
  return dbStatus;
};

const mercadoPagoModule = {
  createPreference,
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
