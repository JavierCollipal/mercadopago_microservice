const { companyUserTransactionsModel } = require("../database/index");
const { logger } = require("../config/logger/pino");

const createTransaction = (itemId, companyUserId, preferenceId, state) => {
  companyUserTransactionsModel
    .create({
      preferenceId,
      companyUserId,
      itemId,
      state
    })
    .then(transaction => transaction.save())
    .catch(err => logger.error(err));
};

const companyUserTransactionModule = {
  createTransaction
};

module.exports = Object.freeze(companyUserTransactionModule);
