const { MercadoPago, defaultPreferenceMaker } = require("../config/mercadoPago/mercadoPago");
const onErr = require("../common/onErr");
const { logger } = require("../config/logger/pino");
const { createChannel } = require("../config/amqp/amqplib");
const { userModel } = require("../database/index");
const payerMaker = require("../common/mercadopago/payer");
//nest api job is getting all the items data so the microservice is only going to deal
//with mercadopago Items,Payer and Preferences interface.

const smartCheckoutHandler = (preferences) => {
  return new Promise(((resolve, reject) => {
    MercadoPago.preferences.create(preferences).then(result => resolve(result)).catch(e => reject(e));
  }));
};

const getUserData = (userId) => {
  return new Promise(((resolve, reject) => {
    userModel.findOne({
      where: { id: userId },
    })
      .then(user => resolve(user.get({ plain: true })))
      .catch(err => reject(err));
  }));
};

const makeAPayerObject = (userData) => {
  return payerMaker(
    userData.name,
    userData.lastName,
    userData.email,
    {
      area_code: "+56",
      number: parseInt(userData.cellphone),
    },
    {},
    {
      zip_code: "600000",
      street_name: userData.address,
      street_number: 0,
    },
    userData.created_date,
  );
};

const transactionHandler = (items, userId, preferenceId, state, postulationId) => {
  logger.info("item:" + items);
  logger.info("user Id is:" + userId);
  logger.info("preference Id is:" + preferenceId);
  logger.info("postulation Id is:" + postulationId);
};

const msgHandler = (msg, ch) => {
  const message = JSON.parse(msg.content.toString());
  const items = message.items;
  const userData = getUserData(message.userId);
  userData
    .then(data => {
      const payer = makeAPayerObject(data);
      const preferences = defaultPreferenceMaker(items, payer);
      const responseFromMercadoPago = smartCheckoutHandler(preferences);
      responseFromMercadoPago
        .then(res => {
          transactionHandler(res.body.items, message.userId, res.body.id, 1, message.postulationId);
          ch.sendToQueue(msg.properties.replyTo, Buffer.from(res.body.init_point.toString()), {
            correlationId: msg.properties.correlationId,
          });
          ch.ack(msg);
        })
        .catch(onErr);
    });
};

const rpcChannel = () => {
  const channel = createChannel();
  channel
    .then(ch => {
      ch.assertQueue("payments_rpc", { durable: false }).then(q => {
        ch.prefetch(1);
        logger.info("waiting for RPC requests");
        ch.consume(q.queue, msg => msgHandler(msg, ch));
      });

    });
};

module.exports = {
  rpcChannel,
};
