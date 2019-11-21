const { postulationTransactionModel } = require("../database/index");
const onErr = require("../common/onErr");

const createTransaction = (postulationId, transactionId) => {
  postulationTransactionModel
    .create({
      postulationId,
      transactionId
    })
    .then(transaction => transaction.save())
    .catch(onErr);
};

const postulationTransactionModule = {
  createTransaction
};

module.exports = Object.freeze(postulationTransactionModule);
