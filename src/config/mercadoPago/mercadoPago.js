const MercadoPago = require("mercadopago");
const { mercadopago_sandbox_key } = require("../security/dotenv");
const backUrlMaker = require('../../common/mercadopago/backUrl');

//remember to change this when you get the mercadoPago production key
MercadoPago.configure({
    sandbox: true,
    access_token: mercadopago_sandbox_key,
});

//if we want to use this microservice in another project, this function is useful to make differents urls
const back_urls = backUrlMaker(
    "http://35.238.179.150/company/my-job-offer/1",
    "http://35.238.179.150/company/my-job-offer/2",
    "http://35.238.179.150:8090/api/v1/payments/notification/payment"
);
//same from back url apply here, but a string doesn't need a functional approach.
const notification_url = "http://35.238.179.150:8090/api/v1/payments/notification/payment";
//if we wish to auto return after finishing the payment
const auto_return = "approved";

const defaultPreferenceMaker = (items) => Object.freeze({
    items,
    back_urls: back_urls,
    notification_url: notification_url,
    auto_return: auto_return,
});

module.exports = {
    MercadoPago,
    defaultPreferenceMaker,
};