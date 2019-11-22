const { postulationTransactionModel } = require("../database/index");
const onErr = require("../common/onErr");

const createTransaction = (postulationId, transactionId, payStatus) => {
  postulationTransactionModel
    .create({
      postulationId,
      transactionId,
      payStatus
    })
    .then(transaction => transaction.save())
    .catch(onErr);
};

const updateTransactionState = (postulationId, payStatus) => {
  postulationTransactionModel.update(
    { payStatus },
    {
      where: { postulationId }
    }
  );
};

const findByPostulationId = postulationId => {
  return postulationTransactionModel
    .findOne({
      where: { postulationId }
    })
    .then(transaction => transaction.get({ plain: true }))
    .catch(err => err);
};

const postulationTransactionModule = {
  createTransaction,
  findByPostulationId,
  updateTransactionState
};

module.exports = Object.freeze(postulationTransactionModule);
