const { MercadoPago, defaultPreferenceMaker } = require("../config/mercadoPago/mercadoPago");
const itemsMaker = require("../common/mercadopago/items");
const onErr = require("../common/onErr");
const logger = require("../config/logger/pino");
const { createChannel } = require("../config/amqp/amqplib");
//nest api job is getting all the items data so the microservice is only going to deal
//with mercadopago Items,Payer and Preferences interface.

const smartCheckoutHandler = (preferences) => {
  return new Promise(((resolve, reject) => {
    MercadoPago.preferences.create(preferences).then(result => resolve(result)).catch(e => reject(e));
  }));
};

const transactionHandler = (items, userId, preferenceId, state) => {
  console.log(items);
  console.log(userId);
  console.log(preferenceId);
  console.log(state);
};

const msgHandler = (msg, ch) => {
  const message = JSON.parse(msg);
  const items = itemsMaker(message.products);
  const preferences = defaultPreferenceMaker(items);
  const responseFromMercadoPago = smartCheckoutHandler(preferences);
  responseFromMercadoPago
    .then(res => {
      transactionHandler(res.body.items, res.body.userId, res.body.id);
      ch.sendToQueue(msg.properties.replyTo, Buffer.from(res.body.init_point.toString()), {
        correlationId: msg.properties.correlationId,
      });
      ch.ack(msg);
    })
    .catch(onErr);
};

const rpcChannel = () => {
  const channel = createChannel();

  channel
    .then(ch => {
      ch.assertQueue("pepito", { durable: false });
      ch.prefetch(1);
      logger.info("waiting for RPC requests");
      ch.consume("pepito", msg => msgHandler(msg));
    });
};

module.exports = {
  rpcChannel,
};