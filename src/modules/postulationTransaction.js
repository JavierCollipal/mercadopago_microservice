const { postulationTransactionModel } = require('../database/index');
const onErr = require('../common/onErr');

function createTransaction(postulationId, transactionId, payStatus) {
  postulationTransactionModel
    .create({
      postulationId,
      transactionId,
      payStatus,
    })
    .then((transaction) => transaction.save())
    .catch(onErr);
}

function updateTransactionState(transactionId, payStatus) {
  postulationTransactionModel.update(
    { payStatus },
    {
      where: { transactionId },
    },
  );
}

function findByPostulationId(postulationId) {
  postulationTransactionModel
    .findOne({
      where: { postulationId },
    })
    .then((transaction) => transaction.get({ plain: true }))
    .catch((err) => err);
}

function filterPostulationIds(postulationTransactions) {
  return postulationTransactions.filter(
    (postulation) => postulation.postulationId,
  );
}

function findByMultiplePaymentIds(paymentIds) {
  postulationTransactionModel
    .findAll({
      // eslint-disable-next-line no-undef
      where: { [Op.in]: paymentIds },
    })
    .then((transaction) => transaction.get({ plain: true }))
    .catch((err) => err);
}

const postulationTransactionModule = {
  createTransaction,
  findByPostulationId,
  updateTransactionState,
  findByMultiplePaymentIds,
  filterPostulationIds,
};

module.exports = Object.freeze(postulationTransactionModule);
