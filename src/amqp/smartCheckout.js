const { MercadoPago, defaultPreferenceMaker } = require("../config/mercadoPago/mercadoPago");
const onErr = require("../common/onErr");
const { logger } = require("../config/logger/pino");
const { createChannel } = require("../config/amqp/amqplib");
const { companyUserModel, userTransactionsModel } = require("../database/index");
const payerMaker = require("../common/mercadopago/payer");
//nest api job is getting all the items data so the microservice is only going to deal
//with mercadopago Items,Payer and Preferences interface.
//test
const smartCheckoutHandler = (preferences) => {

  return new Promise(((resolve, reject) => {
    MercadoPago.preferences.create(preferences).then(result => resolve(result)).catch(e => reject(e));
  }));
};

const getUserData = (userId) => {
  try {
    return new Promise(((resolve, reject) => {
    companyUserModel.findByPk(userId)
      .then(user => {
          resolve(user.get({plain: true}))
      })
      .catch(err => reject(err));
  }));
  }
  catch (e) {
    onErr(e);
  }
};

const makeAPayerObject = (userData) => {
  /*this is the only data we can get from companies_users*/
  return payerMaker(
    userData.name,
    userData.lastName || "",
    userData.email,
    {},
    {},
    {},
    null,
  );
};

const transactionHandler = (items, userId, preferenceId, state) => {
  logger.info("la id del usuario en la funcion transaction"+userId);
  userTransactionsModel.create({
    preferenceId: preferenceId,
    companyUserId: userId,
    itemId: items[0].id,
    state: state,
  })
    .then(transaction => transaction.save())
    .catch(onErr);
};

const msgHandler = (msg, ch) => {

  const message = JSON.parse(msg.content.toString());
  logger.info('rabbitqm message: '+ message.userId)
  const userData = getUserData(message.userId);
  const items = [{
    id: 1,
    title: "desbloquear candidatos",
    description: "para ver los candidatos de una postulacion",
    picture_url: "",
    category_id: "servicios",
    quantity: 1,
    currency_id: "CLP",
    unit_price: 10000,
  }];
  userData
    .then(data => {
      const payer = makeAPayerObject(data);
      const preferences = defaultPreferenceMaker(items, payer, message.postulationId.toString());
      const responseFromMercadoPago = smartCheckoutHandler(preferences);

      responseFromMercadoPago
        .then(res => {
          logger.info('ya obtuvo la respuesta de mercadopago')
          transactionHandler(message.items, message.userId, res.body.id, 1);
          ch.sendToQueue(msg.properties.replyTo, Buffer.from(res.body.init_point.toString()), {
            correlationId: msg.properties.correlationId,
          });
          ch.ack(msg);
        })
        .catch(onErr);
    })
    .catch(err => onErr(err));
};

const rpcChannel = () => {
  const channel = createChannel();
  channel
    .then(ch => {
      ch.assertQueue("candidates_unlock_rpc", { durable: false }).then(q => {
        ch.prefetch(1);
        logger.info("waiting for RPC requests on candidates unlock Checkout");
        ch.consume(q.queue, msg => msgHandler(msg, ch));
      });

    });
};

module.exports = {
  rpcChannel,
};
