const MercadoPago = require("mercadopago");
const {
  mercadopago_sandbox_key,
  mercadopago_success_url,
  mercadopago_failure_url,
  mercadopago_pending_url,
  mercadopago_notification_url,
} = require("../security/dotenv");
const backUrlMaker = require("../../common/mercadopago/backUrl");
//remember to change this when you get the mercadoPago production key
MercadoPago.configure({
  sandbox: true,
  access_token: mercadopago_sandbox_key,
});

//if we want to use this microservice in another project, this function is useful to make differents urls
const back_urls = backUrlMaker(
  mercadopago_success_url,
  mercadopago_failure_url,
  mercadopago_pending_url,
);
//same from back url apply here, but a string doesn't need a functional approach.
const notification_url = mercadopago_notification_url;
//if we wish to auto return after finishing the payment
const auto_return = "approved";

const defaultPreferenceMaker = (items, payer, external_reference) => Object.freeze({
  items,
  payer,
  external_reference,
  back_urls,
  notification_url,
  auto_return,
});

module.exports = {
  MercadoPago,
  defaultPreferenceMaker,
};