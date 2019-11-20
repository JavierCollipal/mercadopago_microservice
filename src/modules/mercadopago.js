const { MercadoPago, defaultPreferenceMaker } = require("../config/mercadoPago/mercadoPago");
const payerMaker = require("../common/mercadopago/payer");
const itemMaker = require("../common/mercadopago/items");

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

const mercadoPagoModule = {
  smartCheckoutGenerator,
  createPayer,
  defaultPreferenceMaker,
  createItem
};

module.exports = Object.freeze(mercadoPagoModule);
