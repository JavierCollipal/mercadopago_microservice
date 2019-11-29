const onErr = require('../utils/onErr');
const logger = require('../config/logger/pino');
const createChannel = require('../config/amqp/amqplib');
const itemModule = require('../modules/items');
const mercadoPagoModule = require('../modules/mercadopago');
const companyUserTransactionModule = require('../modules/companyUserTransactions');
const companyUserModule = require('../modules/companyUser');
const postulationTransactionModule = require('../modules/postulationTransaction');

const msgHandler = (msg, ch) => {
  const message = JSON.parse(msg.content.toString());
  const userData = companyUserModule.getUserData(message.userId);
  const itemData = itemModule.findOneById(message.items[0]);
  Promise.all([userData, itemData]).then((values) => {
    const user = values[0];
    const item = values[1];
    const preference = mercadoPagoModule.createPreference(
      user,
      item,
      message.postulationId,
    );
    const responseFromMercadoPago = mercadoPagoModule.smartCheckoutGenerator(
      preference,
    );

    responseFromMercadoPago
      .then((res) => {
        const newTransaction = companyUserTransactionModule.createTransaction(
          item.id,
          message.userId,
          res.body.id,
          4,
        );
        newTransaction
          .then((transaction) => {
            logger.info(
              `transaccion de woorkit creada con id: ${transaction.id}`,
            );
            postulationTransactionModule.createTransaction(
              message.postulationId,
              transaction.id,
              4,
            );
          })
          .catch(onErr);

        ch.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(res.body.init_point.toString()),
          {
            correlationId: msg.properties.correlationId,
          },
        );
        ch.ack(msg);
      })
      .catch(onErr);
  });
};

const candidatesUnlockChannel = () => {
  const channel = createChannel();
  channel.then((ch) => {
    ch.assertQueue('candidates_unlock_rpc', { durable: false }).then((q) => {
      ch.prefetch(1);
      logger.info('waiting for RPC requests on candidates unlock Checkout');
      ch.consume(q.queue, (msg) => msgHandler(msg, ch));
    });
  });
};

const candidatesUnlockModule = { candidatesUnlockChannel };

module.exports = Object.freeze(candidatesUnlockModule);
