const { postulationTransactionModel } = require('../database/core');
const onErr = require('../utils/onErr');

const createTransaction = (postulationId, transactionId, payStatus) => {
  postulationTransactionModel
    .create({
      postulationId,
      transactionId,
      payStatus,
    })
    .then((transaction) => transaction.save())
    .catch(onErr);
};

const updateTransactionState = (transactionId, payStatus) => {
  postulationTransactionModel.update(
    { payStatus },
    {
      where: { transactionId },
    },
  );
};

const findByPostulationId = (postulationId) => {
  postulationTransactionModel
    .findOne({
      where: { postulationId },
    })
    .then((transaction) => transaction.get({ plain: true }))
    .catch((err) => err);
};

const filterPostulationIds = (postulationTransactions) =>
  postulationTransactions.filter((postulation) => postulation.postulationId);

const findByMultiplePaymentIds = (paymentIds) => {
  postulationTransactionModel
    .findAll({
      // eslint-disable-next-line no-undef
      where: { [Op.in]: paymentIds },
    })
    .then((transaction) => transaction.get({ plain: true }))
    .catch((err) => err);
};

const postulationTransactionModule = {
  createTransaction,
  findByPostulationId,
  updateTransactionState,
  findByMultiplePaymentIds,
  filterPostulationIds,
};

module.exports = Object.freeze(postulationTransactionModule);
