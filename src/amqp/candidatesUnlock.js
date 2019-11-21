const onErr = require("../common/onErr");
const { logger } = require("../config/logger/pino");
const { createChannel } = require("../config/amqp/amqplib");
const itemModule = require("../modules/items");
const mercadoPagoModule = require("../modules/mercadopago");
const companyUserTransactionModule = require("../modules/companyUserTransactions");
const companyUserModule = require("../modules/companyUser");

const createPreference = (user, item, postulationId) => {
  const payer = mercadoPagoModule.createPayer(user);
  const formattedItem = mercadoPagoModule.createItem(item);
  const items = [];
  items.push(formattedItem);

  return mercadoPagoModule.defaultPreferenceMaker(items, payer, postulationId.toString());
};

const msgHandler = (msg, ch) => {
  const message = JSON.parse(msg.content.toString());
  const userData = companyUserModule.getUserData(message.userId);
  const itemData = itemModule.findOneById(message.items[0]);

  Promise.all([userData, itemData]).then(values => {
    const user = values[0];
    const item = values[1];
    const preference = createPreference(user, item, message.postulationId);
    const responseFromMercadoPago = mercadoPagoModule.smartCheckoutGenerator(preference);

    responseFromMercadoPago
      .then(res => {
        companyUserTransactionModule.createTransaction(item.id, message.userId, res.body.id, 1);
        ch.sendToQueue(msg.properties.replyTo, Buffer.from(res.body.init_point.toString()), {
          correlationId: msg.properties.correlationId
        });
        ch.ack(msg);
      })
      .catch(onErr);
  });
};

const candidatesUnlockChannel = () => {
  const channel = createChannel();
  channel.then(ch => {
    ch.assertQueue("candidates_unlock_rpc", { durable: false }).then(q => {
      ch.prefetch(1);
      logger.info("waiting for RPC requests on candidates unlock Checkout");
      ch.consume(q.queue, msg => msgHandler(msg, ch));
    });
  });
};

module.exports = {
  candidatesUnlockChannel
};
