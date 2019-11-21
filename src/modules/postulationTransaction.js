const { postulationTransactionModel } = require("../database/index");
const { logger } = require("../config/logger/pino");

const createTransaction = (postulationId, transactionId) => {
  postulationTransactionModel
    .create({
      postulationId,
      transactionId
    })
    .then(transaction => transaction.save())
    .catch(err => logger.error(err));
};

const postulationTransactionModule = {
  createTransaction
};

module.exports = Object.freeze(postulationTransactionModule);
